from flask import Flask, render_template, request, redirect
from flask_pymongo import PyMongo

logged_in = False

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/unistud'
db = PyMongo(app).db

@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html', logged_in=logged_in)


#navbar links
@app.route('/about-us')
def about_us():
    return render_template('about-us.html')

@app.route('/contact-form')
def contact_form():
    return render_template('contact-form.html')

@app.route('/topics')
def topics():
    return render_template('topics.html')


#courses links
@app.route('/biology')
def biology():
    return render_template('biology.html')

@app.route('/chemistry')
def chemistry():
    return render_template('chemistry.html')

@app.route('/physics')
def physics():
    return render_template('physics.html')



@app.route('/software-development')
def software_development():
    return render_template('software-development.html')

@app.route('/web-development')
def web_development():
    return render_template('web-development.html')

@app.route('/data-science')
def data_science():
    return render_template('data-science.html')



@app.route('/philosophy')
def philosophy():
    return render_template('philosophy.html')

@app.route('/poetry')
def poetry():
    return render_template('poetry.html')

@app.route('/fiction')
def fiction():
    return render_template('fiction.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        passwd = request.form.get('password')
        print(f"{username}, {passwd}")
        
        if (db.users.find_one({'username': username})) and db.users.find_one({'password': passwd}) is None:
            logged_in = False
            print(logged_in)

        else:
            logged_in = True
            print(logged_in)
            redirect('/')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)
    