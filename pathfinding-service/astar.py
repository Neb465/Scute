#Description + Copied pseudocode
'''
  ***If open list gets too big, lookup ways to shrink it

  ----------------------------------------------------------------------

  Path cost function (The cost of the distance traveled so far)
  Found by adding up all edges (connections between points) along the path:

  Params: N0 (start point), Nk (current point)
  g(n) = sum(start => current) of an edge weight (basically the distance traveled. A straight line will have a lower cost because its closer compared to a diagonal line) 
  from point i to point i+1

  ----------------------------------------------------------------------

  Heuristic function (A guestimated cost from the current point to the goal point.)
  Can create a generalized function to calculate dist between two points for g(n).
  One of the conditions is that the estimated cost to the goal must be less than or equal to the actual cost of the goal.
  In this specific case we use the haversine formula, which calculates the distance between two points on a sphere given their lat/lon
  
  Params: P1Lon (Point 1 longitude), P1Lat (Point 1 latitude), P2Lon, P2Lat, R (radius of earth)
  h(n) = 2R*arcsin(
    sqrt(
      (sin((P2Lat - P1Lat)/2))^2 + cos(P1Lat)*cos(P2Lat)*(sin((P2Lon - P1Lon)/2))^2
    )
  )

  ----------------------------------------------------------------------

  Total estimated cost is the path cost function + the heuristic function

  f(n) = g(n) + h(n)
  

  The value of f(n) determines which point the algorithm decides to go to. 
  The point with the lowest f value is picked.

  ----------------------------------------------------------------------

  Pseudocode

  function A_Star(start, goal):
    // Initialize open and closed lists
    openHeapQ = [start]          // Nodes to be evaluated
    closedSet = []            // Nodes already evaluated
    
    // Initialize node properties
    start.g = 0                // Cost from start to start is 0
    start.h = heuristic(start, goal)  // Estimate to goal
    start.f = start.g + start.h       // Total estimated cost
    start.parent = null              // For path reconstruction
    while openHeapQ is not empty:
        // Get node with lowest f value - implement using a priority queue
       // for faster retrieval of the best node
        current = node in openHeapQ with lowest f value
        
        // Check if we've reached the goal
        if current = goal:
            return reconstruct_path(current)
            
        // Move current node from open to closed list
        remove current from openHeapQ
        add current to closedSet
        
        // Check all neighboring nodes
        for each neighbor of current:
            if neighbor in closedSet:
                continue  // Skip already evaluated nodes
                
            // Calculate tentative g score
            tentative_g = current.g + distance(current, neighbor)
            
            if neighbor not in openHeapQ:
                add neighbor to openHeapQ
            else if tentative_g >= neighbor.g:
                continue  // This path is not better
                
            // This path is the best so far
            neighbor.parent = current
            neighbor.g = tentative_g
            neighbor.h = heuristic(neighbor, goal)
            neighbor.f = neighbor.g + neighbor.h
    
    return failure  // No path exists
    
    function reconstruct_path(current):
      path = []
      while current is not null:
          add current to beginning of path
          current = current.parent
      return path

'''

import heapq
import math

class Node:
    """A class to store information about each node on a map
    
    Attributes:
      g (float): The actual cost to travel from the starting node to the current node.
      h (float): The heuristic--an estimated cost of travel--from the current node to the goal node.
      f (float): A sum of the g and h terms. Represents the total cost of the current path.
      parent (Node): A reference to the parent--the node previous--of this current node.
      pos (tuple[float, float]): The current node's position. Uses the form (Longitude, Latitude).
      node_id (str): A string of the current node's id.
    """

    def __init__(self, g: float, h: float, f: float, parent: Node, pos: tuple[float, float], node_id: str):
      self.g = g
      self.h = h
      self.f = f
      self.parent = parent
      self.pos = pos
      self.node_id = node_id

    def __lt__(self, other):
      """Dunder (double underscore) function that customizes "less than" evaluations for sorting
      
      """
      return self.f < other.f


#Assumes the longitude and latitude of nodes can be called with 
#node.pos.lat or node.pos.lon
#NOT BEING USED RIGHT NOW
# def calc_g(current_node):
#     prev_node = current_node.parent

#     g = 0
#     while not prev_node == None:
#         g += calc_h(prev_node.pos.lon, prev_node.pos.lat, current_node.pos.lon, current_node.pos.lat)
        
#         current_node = prev_node
#         prev_node = current_node.parent
    
#     return g

def calc_dist(p1Lon: float, p1Lat: float, p2Lon: float, p2Lat: float):
    """Calculates the distance between two points using the haversine function

    Args:
      p1Lon (float): The starting point's longitude.
      p1Lat (float): The starting point's latitude.
      p2Lon (float): The ending point's longitude.
      p2Lat (float): The ending point's latitude.

    Returns:
      float: The calculated distance.
    
    """
    #Constant
    earth_radius = 3959 #miles

    p1Lat, p2Lat, p1Lon, p2Lon = map(math.radians, (p1Lat, p2Lat, p1Lon, p2Lon))
    dist = 2*earth_radius*math.asin(
        math.sqrt(
            math.pow((math.sin((p2Lat - p1Lat)/2)), 2) + (math.cos(p1Lat) * math.cos(p2Lat) * math.pow(math.sin((p2Lon - p1Lon)/2), 2))
        )  
    )

    return dist

def calc_f(g: float, h: float):
    """Calculates the total cost of the current path
    
    Args:
      g (float): The actual cost to travel from the starting node to the current node.
      h (float): The heuristic--an estimated cost of travel--from the current node to the goal node.

    Returns:
      float: The sum of the g and h terms.
    """
    return g + h

def reconstruct_path(current_node: Node):
    """Construct the path starting from the current node to the starting node.

    Args:
      current_node (Node): The current node.

    Returns:
      list[Node]: A list of the nodes in the constructed path.
    
    """
    path = []
    while not current_node == None:
        path.append(current_node.pos)
        current_node = current_node.parent
    path.sort()

    return path

def get_pos_from_nodeID(node_id: str, graph_nodes):
    """Get a node's position based on it's node id.
    
    Args:
      node_id (str): The node's id.
      graph_nodes: A NodeView representation of all the node's in the graph. Has set-like operations.

    Returns:
      tuple[float, float]: A tuple of the longitude and latitude of the node.
    
    """
    lon = float(graph_nodes[node_id]['x'])
    lat = float(graph_nodes[node_id]['y'])
    return (lon, lat)

def get_nodeId_from_pos(pos: tuple[float, float], graph_node_pos_dict: dict):
    """Get a node's id based on it's position.

    Args:
      pos (tuple[float, float]): A tuple of the longitude and latitude of the node.
      graph_node_pos_dict (dict): A dictionary with (longitude, latitude) as the key, and node_id as the value.

    Returns:
      str: The node's id.
    
    """
    #pos[0] is lon, pos[1] is lat
    return graph_node_pos_dict.get((pos[0], pos[1]))

def get_neighbors(graph, graph_nodes, node_id: str):
    """Get nearby neighbors of the current node.

    Args:
      graph: The graph.
      graph_nodes: A NodeView representation of all the node's in the graph. Has set-like operations.
      node_id (str): The node's id.
    
    Returns:
      list[tuple[float, float]]: A list containing each position tuple of each neighbor in the (Longtitude, Latitude) format.
    
    """
    
    #This is in the format {"neighboringnodeid": {...}, "otherneighboringnode": {...}}
    neighbors = graph.adj[node_id]

    neighbors_pos = [get_pos_from_nodeID(node_id, graph_nodes) for node_id in neighbors]

    return neighbors_pos

#Request from js can only use lists, not tuples. So, start and goal must be lists, not tuples.
def a_star(start: list[float, float], goal: list[float, float], graph, graph_nodes, graph_node_pos_dict):
    """Function to run the main A* algorithm.

    Args:
      start (list[float, float]): Position list with the format [Longitude, Latitude].
      goal (list[float, float]): Position list with the format [Longitude, Latitude].
      graph: The graph.

    Returns:
      list[Node]: A list of the nodes in the constructed path.
    
    """
    #Convert start and goal to tuples to prevent type issues in code
    start = tuple(start)
    goal = tuple(goal)

    startNodeID = get_nodeId_from_pos(start, graph_node_pos_dict)
    startNode = Node(0, calc_dist(start[0], start[1], goal[0], goal[1]), calc_dist(start[0], start[1], goal[0], goal[1]), None, start, startNodeID)
    
    #id of each node
    openHeapQ = [startNode]

    #id as key, Node as value
    openDict = {startNodeID: startNode} 
    closedSet = set()

    while len(openHeapQ) > 0:
      currentNode = heapq.heappop(openHeapQ)
      openDict.pop(currentNode.node_id)

      if (currentNode.pos == goal):
        return reconstruct_path(currentNode)
      
      closedSet.add(currentNode)

      currentNeighborsPos = get_neighbors(graph, graph_nodes, currentNode.node_id)

      #neighborPos is pos tuple (lon, lat)
      for neighborPos in currentNeighborsPos:
        neighborID = get_nodeId_from_pos(neighborPos, graph_node_pos_dict)

        if any(node.node_id == neighborID for node in closedSet):
          continue

        #calc_dist in this case is being used to calculate the distance between the currentnode and the neighbor node
        tentative_g = currentNode.g + calc_dist(currentNode.pos[0], currentNode.pos[1], neighborPos[0], neighborPos[1])

        if all(node.pos != neighborPos for node in openHeapQ):
          neighbor_h = calc_dist(neighborPos[0], neighborPos[1], goal[0], goal[1])
          neighborNode = Node(tentative_g, neighbor_h, calc_f(tentative_g, neighbor_h), currentNode, neighborPos, neighborID)

          heapq.heappush(openHeapQ, neighborNode)
          openDict.update({neighborID: neighborNode})

        #if the g from the start of the current path to the neighbor node 
        #is less than an existing path to the neighbor node,
        #its better,
        #so update the information about the neighbor node's old path => new path information
        elif tentative_g < openDict.get(neighborID).g:
          neighborNode = openDict[neighborID]
          neighborNode.g = tentative_g
          neighborNode.h = calc_dist(neighborPos[0], neighborPos[1], goal[0], goal[1])
          neighborNode.f = calc_f(neighborNode.g, neighborNode.h)
          neighborNode.parent = currentNode

    return None #Literally no path is possible
        
# import networkx as nx

# #GraphML format can be achieved easiest from osmnx. Do NOT use osmnx in production. The library is way too big
# graph = nx.read_graphml("./umd_campus.graphml")
# graph_nodes = graph.nodes

# #Dict that maps the (lon, lat) of a node to it's node id
# graph_node_pos_dict = {(float(graph_nodes[node]["x"]), float(graph_nodes[node]["y"])): node for node in graph_nodes}

# result = a_star((-76.9339843, 38.9875604), (-76.9348411, 38.9862069), graph, graph_nodes, graph_node_pos_dict)

# print(result)