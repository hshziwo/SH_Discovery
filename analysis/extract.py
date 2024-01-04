from konlpy.tag import Okt
import re
import os
from nltk import bigrams

stopwords = list()
f = open("stopwords.txt", 'r', encoding='utf-8')
while True:
    line = f.readline()
    if not line: break
    stopwords.append(line.strip())

okt = Okt()

# def get_stopwords():
#     stopwords = list()
#     # path = os.path.dirname(os.path.abspath(__file__))
#     # file_path = os.path.join(path,"stopwords.txt")

#     # f = open(file_path, 'r', encoding='utf-8')

#     f = open("stopwords.txt", 'r', encoding='utf-8')

#     while True:
#         line = f.readline()
#         if not line: break
#         stopwords.append(line.strip())
        
#     return stopwords

def okt_tokenizer(text):
    # okt = Okt()
    
    text = re.sub(r'[^ ㄱ-ㅣ가-힣A-Za-z0-9]', '', text) # 특수기호 제거
    # stopwords = get_stopwords() # 불용어

    # okt.morphs, okt.nouns, okt.phrases
    return [token for token in okt.nouns(text)
            if len(token) > 1 and token not in stopwords]

def extract_bigrams(text):
    
    bgram = bigrams(text)
    bgram_list = [x for x in bgram]

    return bgram_list

def get_edges(tokens) :
    edges_dics = {}
    for token in tokens :
        bgrams = extract_bigrams(token)

        for bgram in bgrams:
            if bgram[0] == bgram[1] :
                continue

            if f"{bgram[0]}_{bgram[1]}" in edges_dics :
                edges_dics[f"{bgram[0]}_{bgram[1]}"] += 1
            elif f"{bgram[1]}_{bgram[0]}" in edges_dics :
                edges_dics[f"{bgram[1]}_{bgram[0]}"] += 1
            else :
                edges_dics[f"{bgram[0]}_{bgram[1]}"] = 1

    edges = []
    for key, value in edges_dics.items() :
        fromto = str(key).split("_")
        source = fromto[0]
        target = fromto[1]
        edges.append({"source":source, "target":target, "count":value})

    return edges

def get_nodes(tokens):
    nodes_dics = {}
    for token in tokens :
        for word in token :
            if word in nodes_dics :
                nodes_dics[word] += 1
            else :
                nodes_dics[word] = 1

    nodes = []
    for key, value in nodes_dics.items() :
        nodes.append({
            "id" : key,
            "count" : value
        })

    return nodes

def get_graph_data(texts):
    tokens = []
    for text in texts :
        token = okt_tokenizer(text)
        tokens.append(token) 
    
    nodes = get_nodes(tokens)
    edges = get_edges(tokens)

    return {
        'nodes' : nodes,
        'edges' : edges
    }
