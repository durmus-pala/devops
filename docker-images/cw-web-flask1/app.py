from flask import Flask, render_template
import socket

hostname = socket.gethostname()    
IPAddr = socket.gethostbyname(hostname)    

app = Flask(__name__)

user = "DevOps Team"
version = "1.0"

@app.route('/')
def main_entry():
    return render_template('index.html', ip = IPAddr, host_name = hostname, user = user, version = version )


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
