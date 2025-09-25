# MLAI4DS__Clustering_(Part_1)_FD

Machine Learning & Artificial  Intelligence for Data  Scientists: Clustering (Part 1)  Fani Deligianni  https://www.gla.ac.uk/schools/computing/staff/ fanideligianni/  School of Computing Science
Unsupervised learning
Aims
Clustering
What we’ll cover  ●   2   algorithms  ○   K - means  ○   Mixture models  ●   The   two   are   related  ●   We’ll   also   see   how   K - means   can   be   kernelised
Number of clusters?
Number of clusters?
Number of clusters?
Number of clusters?
K - means  Step 1:  Choose number of clusters  2 clusters
K - means  Step 2:  Select k random  points as centroids  A  B
K - means  Step 3:  Estimate the distance  between each centroid  and each other point  in the dataset  A  B
K - means  Step 4:  Assign all the points  to the closest cluster  A  B  A  A   A  A   B  B
K - means  Step 5:  Recompute the  centroids of newly  formed clusters &  Repeat steps 3,4  A  B  A  A   A  A   B  B
K - means  Repeat step 3:  Estimate the distance  between each centroid  and each other point  in the dataset  A  B  A  A   A  A   B  B
K - means  Repeat step 4:  Assign all the points  to the closest cluster  A  B  A  A   A  B   B  B
A  B  A  A   A  B   B  B  K - means  Repeat process up to convergence:  •   No changes in group  memberships  •   Maximum number of iterations  have reached
K - means
How do we find the cluster means
K - means   -   example
K - means   -   example
K - means   -   example
K - means   -   example
K - means   -   example
K - means   -   example
K - means   -   example
K - means   -   example
K - means   -   example
K - means   -   example
K - means   -   example
K - means   -   example
K - means   -   example
K - means   -   example
K - means   -   example   -   converged
When does K - means break?  https://scikit - learn.org/
When does K - means break?  https://scikit - learn.org/
When does K - means break?  https://scikit - learn.org/

When does K - means break?
K - means with 2 clusters
K - means with 3 clusters
K - means   –   What is the problem?  ●   Euclidiean distance is not  appropriate   for   non - linearly  separable   clusters  A  B
K - means   –   What is the problem?  ●   Euclidiean distance is not  always   appropriate   for   non -  linearly   separable   clusters  A  B
Kernelising K - means
Kernel K -  means
Kernels  ●   Polynomial:  𝜅   𝑥 ,   𝑦   =   ( 𝑥 𝑇 𝑦 ) 𝑝  ●   Gaussian:  𝜅   𝑥 ,   𝑦   =   exp ( − 𝜆   𝑥   −   𝑦   2 )  A  B
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means   -   example
Kernel K - means
K - means   -   summary
