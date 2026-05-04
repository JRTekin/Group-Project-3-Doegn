# IMPORT LIBRARIES
# We bring in tools from Flask to handle web server tasks (like routing, templates, and sessions)
from flask import Flask, redirect, request, render_template, session, url_for
# We bring in the mariadb library so Python can talk to our database
import mariadb

# Create the actual Flask web application object
app = Flask(__name__)
# The secret key is used to lock and secure the 'session' cookies. 
# CHANGE THIS to a random string!
app.secret_key = "some_random_secret_string"

# Save our HTML file names into variables so we don't have to retype them
HOME_TEMPLATE = 'index.html'
PRODUCTS_TEMPLATE = 'products.html'
PROFILE_TEMPLATE = 'profile_page.html'
LOGIN_TEMPLATE = 'login.html'
VOLUNTEER_TEMPLATE = 'frvillig.hmtl'



# Create a function to connect to the database. We will use this in every route!
def get_db_connection():
    #-----------------------------------------
    # CHANGE THESE: Use your own database connection details!
    #-----------------------------------------
    conn = mariadb.connect(
        user="gb68", 
        password="gb68_DB_password", 
        host="127.0.0.1", 
        port=3306, 
        database="gb68_DB"
    )
    # Return the active connection so the rest of the code can use it
    return conn

# -----------------------------------------
# ROUTE: HOME PAGE
# -----------------------------------------
# When a user visits the main URL ('/'), run this function
@app.route('/', methods=['GET'])
def home():
    return render_template(HOME_TEMPLATE)
 
# -----------------------------------------
# ROUTE: REGISTER A NEW USER
# -----------------------------------------
# When the HTML registration form is submitted, it comes here
@app.route('/register', methods=['POST'])
def register():
    """Processes the HTML registration form."""
    # Get what they typed in the 'full name' box and remove extra spaces (.strip)
    fullName = request.form.get('fullName', '').strip()
    # Get what they typed in the 'email' box and remove extra spaces (.strip)
    email = request.form.get('email', '').strip()
    # Get what they typed in the 'password' box
    password = request.form.get('password', '')

    # If the fullName or email or password box was empty...
    if not fullName or not email or not password:
        # Send them back to the home page with an error message
        return render_template(LOGIN_TEMPLATE, reg_error='Alle felter skal udfyldes', fullName=fullName, emailReg=email, show_register=True)

    # Connect to the database
    conn = get_db_connection()
    # Create a cursor (the tool that actually runs the SQL commands)
    cursor = conn.cursor()
    
    # Ask the database if this email already exists
    # Notice the comma (email,) - Python requires this when checking one variable!
    cursor.execute('SELECT userID FROM users WHERE email = %s', (email,))
    
    # If the database finds a match...
    if cursor.fetchone():
        # Close the connection and show an error
        conn.close()
        return render_template(LOGIN_TEMPLATE, reg_error='Email er allerede i brug', fullName=fullName, emailReg=email, show_register=True)

    # If the email is free, insert the new user into the database
    cursor.execute('INSERT INTO users (fullName, email, password) VALUES (%s, %s, %s)', (fullName, email, password))
    # Save (commit) the changes to the database
    conn.commit()
    # Close the database connection
    conn.close()

    # Send them back to the home page with a success message
    return render_template(LOGIN_TEMPLATE, reg_success='Konto er oprettet! Du kan nu logge ind.')

# -----------------------------------------
# ROUTE: LOGIN button on loginPage
# -----------------------------------------
# When the HTML login form is submitted, it comes here
@app.route('/login', methods=['POST'])
def login():
    """Processes the HTML login form."""
    # Get the username and password they typed in
    email = request.form.get('email', '').strip()
    password = request.form.get('password', '')

    # If they didn't type a email, show an error
    if not email or not password:
        return render_template(LOGIN_TEMPLATE, login_error='Alle felter skal udfyldes', email=email)

    # Connect to the database and create a cursor
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Try to find the user's ID and password in the database
    cursor.execute('SELECT userID, password FROM users WHERE email = %s', (email,))
    # Grab the first row of results
    row = cursor.fetchone()
    # Close the connection
    conn.close()

    # If row is empty (user does not exist)...
    if not row:
        return render_template(LOGIN_TEMPLATE, mail_error='Email ikke fundet', email=email)
        
    # The database gives us a list back. 
    # Grab the first item [0] as the ID, and the second item [1] as the password
    user_id = row[0]
    stored_password = row[1]
    
    # Check if the password they typed matches the password in the database
    if stored_password == password:
        # If it matches, save their ID into the browser's session cookie
        session['userid'] = user_id
        # Send them to the profile page
        return redirect(url_for('profile_page'))
    else:
        # If the password is wrong, show an error
        return render_template(LOGIN_TEMPLATE, login_error='Forkert kodeord', email=email)


# -----------------------------------------
# ROUTE: PROFILE PAGE
# -----------------------------------------
# Show the user their profile 
@app.route('/profile', methods=['GET'])
def profile_page():
    """Fetches user data, then renders the profile."""
    # If there is no 'userid' in the session, they are not logged in!
    if 'userid' not in session:
        # Send them back to the login page
        return render_template(LOGIN_TEMPLATE)
        
    # Get the user's ID from the session cookie
    user_id = session['userid']
    
    # Connect to the database
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get the user's information from the database
    cursor.execute('SELECT fullName, email, password FROM users WHERE userid = %s', (user_id,))
    user_row = cursor.fetchone()
    
    # If the user was deleted from the database but still has a cookie...
    if not user_row:
        # Remove their cookie and send them home
        session.pop('userid', None)
        return redirect(url_for('home'))

    # Create a Python Dictionary to hold the user's info
    user_data = {
        'fullName': user_row[0],
        'email': user_row[1],
        'password': user_row[2],
    }
    
    # Send the user to the profile page, and hand the HTML the user_data and user_products variables
    return render_template(PROFILE_TEMPLATE, user_data=user_data)
# -----------------------------------------
# ROUTE: UPDATE PROFILE
# -----------------------------------------
@app.route('/update_profile', methods=['POST'])
def update_profile():
    # User must be logged in
    if 'userid' not in session:
        return redirect(url_for('loginPage'))

    user_id = session['userid']

    # Get new values from the form
    new_name = request.form.get('fullName')
    new_email = request.form.get('email')

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            UPDATE users
            SET fullName = %s, email = %s
            WHERE userID = %s
        """, (new_name, new_email, user_id))

        conn.commit()
        success = "Profil opdateret!"
        error = None

    except Exception as e:
        success = None
        error = "Kunne ikke opdatere profil"

    conn.close()

    # Reload the profile page in NON‑edit mode
    return render_template(
        PROFILE_TEMPLATE,
        user_data={'fullName': new_name, 'email': new_email},
        update_success=success,
        update_error=error
    )

# -----------------------------------------
# ROUTE: PRODUCTS
# -----------------------------------------
@app.route('/products', methods=['GET'])
def products_page():
    return render_template(PRODUCTS_TEMPLATE)
# -----------------------------------------
# ROUTE: LOGOUT
# -----------------------------------------
# When the user clicks logout, it comes here
@app.route('/logout', methods=['GET'])
def logout():
    # Remove the 'userid' from their session cookie
    session.pop('userid', None)
    # Send them back to the home page
    return redirect(url_for('home'))
# -----------------------------------------
# RUN THE APPLICATION
# -----------------------------------------
# This tells Python to start the server!

# CHANGE THIS: Use your assigned Port number! Use a number above 64000 and below 64199. I recommend 640XX where XX is your group number. For example, if you are group 5, use 64005.
PORT_NUMBER = 64025

@app.route('/program', methods=['GET'])
def program():
    return render_template('program.html')

@app.route('/kontakt', methods=['GET'])
def kontakt():
    return render_template('kontakt.html')

@app.route('/praktisk', methods=['GET'])
def praktisk():
    return render_template('praktisk.html')

@app.route('/om', methods=['GET'])
def om():
    return render_template('om.html')

@app.route('/calvinHarris', methods=['GET'])
def calvinHarris():
    return render_template('calvin-harris.html')

@app.route('/kesi', methods=['GET'])
def kesi():
    return render_template('kesi.html')

@app.route('/gorillaz', methods=['GET'])
def gorillaz():
    return render_template('gorillaz.html')

@app.route('/fredAgain', methods=['GET'])
def fredAgain():
    return render_template('fred-again.html')

@app.route('/ellaAugusta', methods=['GET'])
def ellaAugusta():
    return render_template('ella-augusta.html')

@app.route('/eeeGee', methods=['GET'])
def eeeGee():
    return render_template('eee-gee.html')

@app.route('/centralCee', methods=['GET'])
def centralCee():
    return render_template('central-cee.html')

@app.route('/theMindsOf99', methods=['GET'])
def theMindsOf99():
    return render_template('the-minds-of-99.html')

@app.route('/augustHoyen', methods=['GET'])
def augustHoyen():
    return render_template('august-hoyen.html')

@app.route('/frivillig', methods=['GET'])
def frivillig():
    return render_template('frivillig.html')

@app.route('/handelsbetingelser', methods=['GET'])
def handelsbetingelser():
    return render_template('handelsbetingelser.html')  

@app.route('/persondata', methods=['GET'])
def persondata():
    return render_template('persondata.html')  

@app.route('/cookiepolitik', methods=['GET'])
def cookiepolitik():
    return render_template('cookiepolitik.html')  

@app.route('/konkurencebetingelser', methods=['GET'])
def konkurrencebetingelser():
    return render_template('konkurrencebetingelser.html')  



if __name__ == '__main__':
    # CHANGE THIS: Use your assigned Port number!
    app.run(host='130.225.170.248', port=PORT_NUMBER, debug=True)