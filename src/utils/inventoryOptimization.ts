interface Point {
  x: number;
  y: number;
}

interface Cluster {
  centroid: Point;
  points: Point[];
}

export function kMeansClustering(
  points: Point[],
  k: number,
  maxIterations: number = 100
): Cluster[] {
  // Initialize k random centroids
  let centroids = points
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, k);

  let clusters: Cluster[] = [];
  let iterations = 0;

  while (iterations < maxIterations) {
    // Assign points to nearest centroid
    clusters = centroids.map(centroid => ({ centroid, points: [] }));

    points.forEach(point => {
      let minDistance = Infinity;
      let nearestCluster = clusters[0];

      clusters.forEach(cluster => {
        const distance = calculateDistance(point, cluster.centroid);
        if (distance < minDistance) {
          minDistance = distance;
          nearestCluster = cluster;
        }
      });

      nearestCluster.points.push(point);
    });

    // Calculate new centroids
    const newCentroids = clusters.map(calculateCentroid);
    
    // Check for convergence
    if (centroidsEqual(centroids, newCentroids)) {
      break;
    }

    centroids = newCentroids;
    iterations++;
  }

  return clusters;
}

function calculateDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function calculateCentroid(cluster: Cluster): Point {
  const sum = cluster.points.reduce(
    (acc, point) => ({
      x: acc.x + point.x,
      y: acc.y + point.y,
    }),
    { x: 0, y: 0 }
  );

  return {
    x: sum.x / cluster.points.length,
    y: sum.y / cluster.points.length,
  };
}

function centroidsEqual(c1: Point[], c2: Point[]): boolean {
  return c1.every((centroid, i) =>
    centroid.x === c2[i].x && centroid.y === c2[i].y
  );
}