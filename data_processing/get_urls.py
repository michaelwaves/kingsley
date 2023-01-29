import nltk
from bs4 import BeautifulSoup
from bs4 import Comment
import requests
import re
import json
#from prettyprint import prettyprint
save_file = ".\\data_processing\\html.json"
save = json.load(open(save_file, 'w+'))
def get_all_urls(base, rep, at_links, save, save_file, visited = set(), filter = []):
    while at_links:
        try:
            at = at_links.pop()
            print(at)
            visited.add(at)
            links = set([])
            html = requests.get(at)
            save[at] = html.text
            #print(html.text)
            json.dump(save, open(save_file, 'w+'))
            soup = BeautifulSoup(html.text, 'lxml')
            for link in soup.findAll('a'):
                if link.get('href'):
                    if link.get('href')[0] == '/':
                        links.add(rep+link.get('href'))
                    elif link.get('href').find(at) != -1:
                        links.add(link.get('href'))
                if link.get('src'):
                    links.add(link.get('src'))
            at_links = (at_links | set([l for l in list(links) if True in [l.find(b) == 0 for b in base] and False not in [l.find(f) == -1 for f in filter]])) - visited
            #print(at_links)
        except:
            with open("log.txt", 'w+') as f:
                f.write(str(at) + ": " + str(list(at_links)))
            break
    return list(visited)



# test = 'https://www.cityofkingston.ca/explore/culture-history/culture-blog?p_p_id=com_liferay_blogs_web_portlet_BlogsPortlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_com_liferay_blogs_web_portlet_BlogsPortlet_delta=5&p_r_p_resetCur=false&_com_liferay_blogs_web_portlet_BlogsPortlet_cur=3//explore/culture-history/history/engage-for-change/residents/accessibility/residents/waste/collection-calendar/residents/property-taxes/explore/culture-history/culture-blog/blogger-profile'

# base = ['https://www.cityofkingston.ca']
# filter = ['https://www.cityofkingston.ca/residents/city-calendar-events/', '?']
# visited = set([])
# filtered_lists = list(set([l for l in list(set([test])) if True in [l.find(b) == 0 for b in base] and False not in [l.find(f) == -1 for f in filter]]) - visited)
# print(filtered_lists)
print(get_all_urls(['https://www.cityofkingston.ca'], 'https://www.cityofkingston.ca', set(['https://www.cityofkingston.ca']), save, save_file, filter=['https://www.cityofkingston.ca/residents/city-calendar-events/', 'https://www.cityofkingston.ca/documents/', 'archive']))