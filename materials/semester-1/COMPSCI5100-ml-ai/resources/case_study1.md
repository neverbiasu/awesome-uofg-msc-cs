# Enriched Content: case_study1.ipynb

This document is a complete and detailed AI-friendly version of the Jupyter Notebook `case_study1.ipynb`. All markdown cells, code cells, text outputs, and plot outputs have been meticulously transcribed and described.

---

### Case Study 1

#### Model selection for Clustering

Clustering is unsupervised learning: the resulting clusters are completely derived from data distributed in given a feature set with no class available.

Compared to supervised learning counterparts, it is…
- hard to define model performance (cluster quality)
- sensitive to different clustering algorithms and different feature spaces.

#### Task
Your task is to try different clustering algorithms and also a range of the potential parameter(s) which affect the number of clusters including...

- K-means
- Gaussian Mixture Model
- Hierarchical Clustering
- Louvain Clustering

on 5K colorectal patches represented by 4 different representation PathologyGAN, ResNet50, InceptionV3 and VGG16.

#### Data and its preprocessing
5,000 non-overlapping image patches from hematoxylin & eosin (H&E) stained histological images of human colorectal cancer (CRC) and normal tissue.
- 4 feature sets, PathologyGAN, ResNet50, InceptionV3 and VGG16, are extracted to represent those 5,000 images different dimensional feature spaces.
- PCA and UMAP were employed to reduce each feature space into 100-dimensional vectors.
- 9 tissue types are also available which include Adipose (ADI), background (BACK), debris (DEB), lymphocytes (LYM), mucus (MUC), smooth muscle (MUS), normal colon mucosa (NORM), cancer-associated stroma (STR), colorectal adenocarcinoma epithelium (TUM).

#### Performance Measurement
To assess quality of clustering solutions, several approaches are expected to be done and interpreted which include...
- Silhouette Score for goodness of fit test
- V-measure Score for homogeneity and completeness test (tissue type available as ground truth)
- Clusters visualisations

#### Report
Report on your preprocessing pipeline, theory and intuition behinds each algorithm and representation, parameter searching and performance evaluation frameworks. If there is any additional process, give evidences/justifications on how it helps.

---

### Required Packages

```python
# !pip install h5py==2.10.0
# !pip install numpy
# !pip install pandas
# !pip install sklearn
# !pip install scikit-network
# !pip install pickle-mixin==1.0.2
# !pip install matplotlib
# !pip install plotly
```

---

### Prepare Tissue Representations

```python
import h5py
import numpy as np
import pickle
```

```python
pge_path = 'colon_nct_feature/pge_dim_reduced_feature.h5'
resnet50_path = 'colon_nct_feature/resnet50_dim_reduced_feature.h5'
inceptionv3_path = 'colon_nct_feature/inceptionv3_dim_reduced_feature.h5'
vgg16_path = 'colon_nct_feature/vgg16_dim_reduced_feature.h5'

pge_content = h5py.File(pge_path, mode='r')
resnet50_content = h5py.File(resnet50_path, mode='r')
inceptionv3_content = h5py.File(inceptionv3_path, mode='r')
vgg16_content = h5py.File(vgg16_path, mode='r')
```

```python
#PCA feature from 4 feature sets: pge_latent, resnet50_latent, inceptionv3_latent, vgg16_latent
pge_pca_feature  = pge_content['pca_feature'][...]
resnet50_pca_feature  = resnet50_content['pca_feature'][...]
inceptionv3_pca_feature = inceptionv3_content['pca_feature'][...]
vgg16_pca_feature  = vgg16_content['pca_feature'][...]
```

```python
#UMAP feature from 4 feature sets: pge_latent, resnet50_latent, inceptionv3_latent, vgg16_latent
pge_umap_feature  = pge_content['umap_feature'][...]
resnet50_umap_feature = resnet50_content['umap_feature'][...]
inceptionv3_umap_feature  = inceptionv3_content['umap_feature'][...]
vgg16_umap_feature  = vgg16_content['umap_feature'][...]
```

```python
#tissue type as available ground-truth: labels
filename  = np.squeeze(pge_content['file_name'])
filename = np.array([str(x) for x in filename])
labels = np.array([x.split('/')[2] for x in filename])
labels
```

**Output:**
```
array(['ADI', 'ADI', 'ADI', ..., 'TUM', 'TUM', 'TUM'], dtype='<U4')
```

---

### Example & Exploratory Analysis

```python
import random

random.seed(0)
selected_index = random.sample(list(np.arange(len(pge_pca_feature))), 200)

test_data = pge_pca_feature[selected_index]
test_label = labels[selected_index]
```

```python
import plotly.graph_objects as go
import pandas as pd

traces = []
for name in np.unique(labels):
    trace = go.Scatter3d(
        x=test_data[test_label==name,0],
        y=test_data[test_label==name,1],
        z=test_data[test_label==name,2],
        mode='markers',
        name=name,
        marker=go.scatter3d.Marker(
            size=4,
            opacity=0.8
        )
    )
    traces.append(trace)

data = go.Data(traces)
layout = go.Layout(
    showlegend=True,
    scene=go.Scene(
        xaxis=go.layout.scene.XAxis(title='PC1'),
        yaxis=go.layout.scene.YAxis(title='PC2'),
        zaxis=go.layout.scene.ZAxis(title='PC3')
    )
)
fig = go.Figure(data=data, layout=layout)
fig.update_layout(
    title="First 3 pricipal components of PathologyGAN's PCA feature",
    legend_title="Legend Title",
)

fig.show()
```

> **Plotly Output Analysis:**
> - **Overall Description**: This code generates an interactive 3D scatter plot using Plotly to visualize the first three principal components (PC1, PC2, PC3) of the PathologyGAN features for a sample of 200 data points.
> - **Functionality**: Each point in the 3D space represents a tissue patch. The points are colored based on their true tissue type label (e.g., ADI, BACK, TUM). The plot allows the user to rotate, pan, and zoom to explore the data structure and see how well the different tissue types are separated in the 3D PCA space.

---

### Model training

```python
from sklearn.cluster import KMeans
from sklearn.mixture import GaussianMixture
from sklearn.cluster import AgglomerativeClustering
from sknetwork.clustering import Louvain

#to create Adjacency matrix for Louvain clustering
from sklearn.metrics import pairwise_distances 
from sklearn.preprocessing import MinMaxScaler

from scipy import sparse
```

```python
kmeans_model = KMeans(n_clusters = 3, random_state = 0) #GaussianMixture(), AgglomerativeClustering(), Louvain
kmeans_assignment = kmeans_model.fit_predict(test_data)
```
