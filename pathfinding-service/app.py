from flask import Flask, request, jsonify
from astar import a_star
import networkx as nx

app = Flask(__name__)

#GraphML format can be achieved easiest from osmnx. Do NOT use osmnx in production. The library is way too big
graph = nx.read_graphml("./umd_campus.graphml")
graph_nodes = graph.nodes

#Dict that maps the (lon, lat) of a node to it's node id
graph_node_pos_dict = {(float(graph_nodes[node]["x"]), float(graph_nodes[node]["y"])): node for node in graph_nodes}

@app.route('/astar', methods=["POST"])
def calc_path():
  data = request.get_json()
  #Floats
  start = data.get("start")
  goal = data.get("goal")

  start = [float(start[0]), float(start[1])]
  goal = [float(goal[0]), float(goal[1])]

  # if start is None or goal is None:
  #   return jsonify({"msg": "Start and goal are required"}), 400
  
  path = a_star(start, goal, graph, graph_nodes, graph_node_pos_dict)

  if path is None:
    return jsonify({"message": "No path found"}), 404
  
  return jsonify({"path": path})

#For local testing only
# if __name__ == "__main__":
#   app.run(host="0.0.0.0", port=5001)
