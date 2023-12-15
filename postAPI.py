from flask import Flask, request, jsonify
import requests
app = Flask(__name__)
# Replace 'NODE_SERVER_URL' with the actual URL of your Node.js server
NODE_SERVER_URL = 'http://localhost:3000'
@app.route('/api/school', methods=['POST'])
def create_or_update_school():
    try:
        data = request.json
        response = requests.post(f'{NODE_SERVER_URL}/api/school', json=data) 
        return jsonify(response.json()), response.status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(port=5000)
