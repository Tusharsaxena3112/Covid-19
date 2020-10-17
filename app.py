from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/precautions')
def precautions():
    return render_template('Precautions1.html')


@app.route('/tracker')
def tracker():
    return render_template('tracker.html')


@app.route('/news')
def news():
    return render_template('News.html')


@app.route('/medi-care')
def medi_care():
    return render_template('medicare.html')


if __name__ == '__main__':
    app.run(debug=True)
