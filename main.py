from flask import Flask, render_template, request, redirect, url_for, flash
from flask_bcrypt import Bcrypt
import mysql.connector as con

logged_in = False
username = "Log in"
app = Flask(__name__)
app.config['SECRET_KEY'] = "hbfequrty"


#connector object
mysql = con.connect(host = "localhost", user = "root", passwd = "tiger123", database = "mydb")
crypt = Bcrypt(app)
cursor = mysql.cursor()

@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html', logged_in=logged_in, username = username)


#navbar links
@app.route('/about-us')
def about_us():
    return render_template('about-us.html',logged_in=logged_in, username = username)

@app.route('/contact-form')
def contact_form():
    return render_template('contact-form.html',logged_in=logged_in, username = username)

@app.route('/topics')
def topics():
    return render_template('topics.html',logged_in=logged_in, username = username)


#courses links
@app.route('/biology')
def biology():
    return render_template('biology.html',logged_in=logged_in, username = username)

@app.route('/chemistry')
def chemistry():
    return render_template('chemistry.html',logged_in=logged_in, username = username)

@app.route('/physics')
def physics():
    return render_template('physics.html',logged_in=logged_in, username = username)



@app.route('/software-development')
def software_development():
    return render_template('software-development.html',logged_in=logged_in, username = username)

@app.route('/web-development')
def web_development():
    return render_template('web-development.html',logged_in=logged_in, username = username)

@app.route('/data-science')
def data_science():
    return render_template('data-science.html',logged_in=logged_in, username = username)



@app.route('/philosophy')
def philosophy():
    return render_template('philosophy.html',logged_in=logged_in, username = username)

@app.route('/poetry')
def poetry():
    return render_template('poetry.html',logged_in=logged_in, username = username)

@app.route('/fiction')
def fiction():
    return render_template('fiction.html',logged_in=logged_in, username = username)




@app.route('/register', methods=['GET', 'POST'])
def register():
    global username
    if request.method == 'POST':
        user = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']


        # Check if passwords match
        if password != confirm_password:
            flash('Passwords do not match!', 'error')
            return redirect(url_for('register'))
        
        else:
            cursor.execute("SELECT * FROM users")
            check = cursor.fetchall()

            for x in check:
                if x[0] == user:
                    flash("Account with that name already exists! be more creative", category = "error")
                    break
            
            else:
                if password != None:
                    flash("Account created!", category = "success")
                    hashedpass = crypt.generate_password_hash(password)
                    cursor.execute("INSERT INTO users VALUES (%s, %s, %s)", (user, email, hashedpass))
                    mysql.commit()
                    username = user
                    return redirect("/login")
        
    return render_template("register.html", logged_in=True, username=username)

@app.route('/login', methods=['GET', 'POST'])
def login():
    global logged_in
    global username
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        cursor.execute("SELECT * FROM users WHERE username = %s", [username])
        check = cursor.fetchone()
        if check != None and crypt.check_password_hash(check[2], password):
            logged_in = True
        else:
            pass
        if logged_in:
            flash("Logged in successfully!", category = "success")
            return redirect("/")
        else:
            flash("Incorrect username/password", category = "error")

    return render_template('login.html', logged_in = logged_in)

if __name__ == '__main__':
    app.run(debug=True)
    