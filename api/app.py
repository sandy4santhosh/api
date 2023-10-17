from flask import Flask, render_template, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.get_json()
    user_input = data['txt']
    # Perform some processing on user_input
    # For demonstration purposes, we'll convert it to uppercase.
    processed_result = task(user_input)

    return jsonify({'result': processed_result})

@app.route('/create', methods=['POST'])
def create():
    data = request.get_json()
    # Perform some processing on user_input
    # For demonstration purposes, we'll convert it to uppercase.
    processed_result = makedict(data)

    return jsonify({'result': processed_result})

dict1 ={ }
def task(input):
    if (input == 'hi'):
        return 'hi i am chatbot'
    else:
        return input.upper()
def makedict(data):
    dict1['name'] = data['name']
    dict1['age'] = data['age']
    dict1['DOB'] = data['DOB']
    dict1['currentlocation'] = data['currentlocation']
    print(dict1.values())
    return 'created successfully'
    
 
if __name__ == '__main__':
    app.run(debug=True)

