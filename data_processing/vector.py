
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
import numpy as np
import re
import json
from nltk.stem.porter import PorterStemmer
porter = PorterStemmer()

dim = 100

vector_file = ".\\data_processing\\vector.json"
doc_file = ".\\data_processing\\doc.json"
#bag_file = ".\\data_processing\\bag.json"
#main_bag_file = ".\\data_processing\\main_bag.json"
documents = json.load(open(doc_file))
vectors = json.load(open(vector_file))
#main_bag = json.load(open(main_bag_file))
#bags = json.load(open(bag_file))


stop_words = set(stopwords.words('english'))
word_embeddings = {}
f = open(f'.\\data_processing\\glove.6B\\glove.6B.{str(dim)}d.txt', encoding='utf-8')
for line in f:
    values = line.split()
    word = values[0]
    coefs = np.asarray(values[1:], dtype='float32')
    word_embeddings[word] = coefs
f.close()

def remove_stopwords(text):
    text_new = " ".join([i for i in text.split() if i not in stop_words])
    return text_new

def clean_text(text):
    clean = re.sub(r"""
               [,.;@#?!&$()-_'":0123456789]+[ ]*
               """,
               " ", text, flags=re.VERBOSE)
    return clean

def vectorize(text, word_embeddings):
    div = 0.001
    vec = [np.zeros((dim,))]
    
    stemmed = [porter.stem(word) for word in text.split()]
    for word in stemmed:
        
        vec.append(word_embeddings.get(word.lower(), np.zeros((dim,))))
        div += 1
    return list(sum(vec)/div)

def clean_vectorize(text):
    global word_embeddings
    return vectorize(remove_stopwords(clean_text(text)), word_embeddings)

def get_hot_words(text):
    bag = set([])
    for word in text.split():
        if word.lower() != word and len(word) > 1:
            bag.add(word.lower())
    return bag

def create_main_bag(documents):
    main_bag = set([])
    for page, text in documents.items():
        print("bagging: " + page)
        main_bag = main_bag | get_hot_words(remove_stopwords(clean_text(text)))
    return list(main_bag)
def create_bag(text, main_bag):
    bag = get_hot_words(text)
    return [int(word.lower() in bag) for word in main_bag]
def create_clean_bag(text, main_bag):
    bag = get_hot_words(remove_stopwords(clean_text(text)))
    return [int(word.lower() in bag) for word in main_bag]
if __name__ == "__main__":
    #main_bag["main_bag"] = create_main_bag(documents)
    #print(len(main_bag["main_bag"]))
    #json.dump(main_bag, open(main_bag_file, 'w+'))
    for page, text in documents.items():
        print(page)
        cleaned_text = remove_stopwords(clean_text(text))
        vectors[page] = vectorize(cleaned_text, word_embeddings)
        #bags[page] = create_bag(cleaned_text, main_bag["main_bag"])
        json.dump(vectors, open(vector_file, 'w+'))
        #json.dump(bags, open(bag_file, 'w+'))
    json.dump(vectors, open(vector_file, 'w+'))
    #json.dump(bags, open(bag_file, 'w+'))


