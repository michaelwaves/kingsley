import vector
from sklearn.metrics.pairwise import cosine_similarity
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
import numpy as np
import re
from nltk.stem.porter import PorterStemmer
porter = PorterStemmer()
stop_words = set(stopwords.words('english') + ["tell", "about"])





pages = []
p_vecs = []
for page, vec in vector.vectors.items():
    pages.append(page)
    p_vecs.append(vec)
p_vecs_np = np.array(p_vecs)



def find_similarity(question, texts):
    texts = [re.split(r'\W+', t.encode("utf-8", "replace").decode()) for t in texts]
    texts = [[porter.stem(word.lower()) for word in text if word] for text in texts]
    texts = [[word for word in text if word not in stop_words] for text in texts]
    question = re.split(r'\W+', question)
    
    question = [porter.stem(word.lower()) for word in question if word]
    question = [word for word in question if word not in stop_words and word]
    #print(question)
    #print(question)
    similarities = np.array([len(set(text) & set(question)) / (len(set(text))) if text else 0.0 for text in texts])
    return (-similarities).argsort()


def get_texts(question, tryn):
    question_vector = vector.clean_vectorize(question)
    sim = cosine_similarity(np.array(question_vector).reshape(1,vector.dim), p_vecs)[0]
    # print(sim[:10])
    ind = np.argsort(-sim)[:tryn]
    pagei = [pages[i] for i in ind]
    texts = list(set([vector.documents[p] for p in pagei]))
    new_ind = find_similarity(question, texts)
    texts = [re.sub(r'[\'\"]', "~", texts[i]) for i in new_ind]
    return texts, [pagei[i] for i in new_ind]

def construct_context(texts, max_words):
    context =  "Contexts\n\n------\n\n"
    i = 0
    pages_used = [False for i in range(100)]
    while len(re.split(r'\W+', context)) <= max_words:
        if len(re.split(r'\W+', context)) + len(re.split(r'\W+', texts[i])) > max_words:
            if context == "Contexts\n\n------\n\n":
                i += 1
            else:
                break
        else:
            context = context + texts[i].encode("utf-8", "replace").decode() + "\n\n"
            pages_used[i] = True
            i += 1
    context = context + "------\n\n"
    #print(i)
    return context, pages_used

def create_prompt(question, max_words=1400):
    texts, pages = get_texts(question, 100)
    context, pages_used = construct_context(texts, max_words)
    return context+"Q: "+question+"\n\n###\n\nA:", texts, [pages[i] for i in range(len(pages_used)) if pages_used[i]]
