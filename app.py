from flask import Flask
from flask import render_template
from model import Model

app = Flask(__name__)

name = "amit koren"


@app.route('/')
def hello_world():
    model = Model()
    data = model.get_score_from_database()
    return render_template('index.html', data=data)


if __name__ == '__main__':
    app.run(debug=True)
