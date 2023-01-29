from flask import Flask, redirect, url_for, request
from flask_cors import CORS
import chatbot

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": r"[https://].*?[.ngrok.io]"}})
#print(request.headers["Access-Control-Allow-Origin"])
#app.config['CORS_HEADERS'] = 'AllowAll'
@app.route('/question')
def question():
   
    text = request.args.get('text')
    response, _1, _2 = chatbot.ask(text)

    print(response["answer"])
    #response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    app.run(port=3000)  # run our Flask app