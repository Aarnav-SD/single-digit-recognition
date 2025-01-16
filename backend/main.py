from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
import numpy as np

app = Flask(__name__)
CORS(app)

digits = load_digits()

X_train, X_test, y_train, y_test = train_test_split(digits.data, digits.target, test_size=0.2, shuffle=False)

model = LogisticRegression(max_iter=10000)
model.fit(X_train, y_train)
model.score(X_test, y_test)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json.get('grid')
        print("Received Grid:", data)
        if not data:
            return jsonify({'error': 'No grid data provided'}), 400

        grid = np.array(data).reshape(1, -1) 

        prediction = model.predict(grid)[0]

        return jsonify({'prediction': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)