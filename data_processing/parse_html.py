import nltk
from bs4 import BeautifulSoup
from bs4 import Comment
import re
import json

html_file = ".\\data_processing\\html.json"
doc_file = ".\\data_processing\\doc.json"
pages = json.load(open(html_file))
documents = {}
def clean_text(text):
    clean = re.sub(r"""
               [-_#\t\n]+[ ]*
               """,
               " ", text, flags=re.VERBOSE)
    return clean
for page, html in pages.items():
    print(page)
    soup = BeautifulSoup(html)
    body = soup.find("div", {"class": "aui-w75 portlet-column portlet-column-last"})
    if body and body.find("p"):
        for s in body.select('script'):
            s.extract()
        for s in body.select('style'):
            s.extract()
        for s in body(text=lambda text: isinstance(text, Comment)):
            s.extract()
        #texts = body.findAll("p")#, text=True)
        texts = [tag.getText() for tag in body.find_all('p')]#["p", re.compile('^h[0-9]*$')]
        text = " ".join((" ".join([t for t in texts if t != '\n'])).split())
        documents[page] = clean_text(text)
        json.dump(documents, open(doc_file, 'w+'))
json.dump(documents, open(doc_file, 'w+'))