from flask import Flask, request, jsonify
from flask_mysqldb import MySQL

NOT_FOUND = 404

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'users'

mysql = MySQL(app)

def db_select_user(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE id = %s", (id,))
    user = cur.fetchone()
    cur.close()

    return user

def db_update_user(data, id):
    cur = mysql.connection.cursor()

    columns = data.keys()
    values = list(data.values())

    query = f"UPDATE users SET {', '.join(f'{col} = %s' for col in columns)} WHERE id = %s"
    values.append(id)

    cur.execute(query, tuple(values))
    mysql.connection.commit()
    cur.close()

@app.route('/user', methods=['PUT'])
def update_user():
    id = request.args.get('id')

    if id == None:
        return jsonify({"error": "ID não informado"}), NOT_FOUND
    
    user = db_select_user(id)

    data = request.json

    if not data:
        return jsonify({"error": "Nenhum dado enviado"}), 400

    db_update_user(data, id)

    user = db_select_user(id)

    if user:
        return jsonify({"id": user[0], "name": user[1] + " " + user[2], "idade": user[3]})
    else:
        return jsonify({"error": "Usuário não encontrado"}), NOT_FOUND

if __name__ == '__main__':
    app.run(debug=True, port=5000)