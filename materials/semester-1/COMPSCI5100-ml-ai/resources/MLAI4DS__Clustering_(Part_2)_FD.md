# MLAI4DS__Clustering_(Part_2)_FD

Machine Learning & Artificial  Intelligence for Data  Scientists: Clustering (Part 2)  Fani Deligianni  https://www.gla.ac.uk/schools/computing/staff/ fanideligianni/  School of Computing Science
Mixture  models   –  thinking  generatively
Mixture  models   –  Gaussian  Distribution  𝑓   𝑋   =   1  𝜎   2𝜋   𝑒 − 1  2 ( 𝑋 − 𝜇  𝜎   ) 2  p   𝑋 | 𝜇 ,   𝜎   ~ 𝑁 ( 𝜇 ,   𝜎 )
Mixture  models   –  Gaussian  Distribution  in 2D  p   𝑿 | 𝝁 ,   𝜮   =   1  ( 2 𝜋 ) 𝑛 / 2   𝜮   1 / 2   𝑒 − 1  2   𝑿 − 𝝁   𝑇 𝜮 − 1 ( 𝑿 − 𝝁 )
Mixture models   –   Gaussian Distribution in 2D  p   𝑿 | 𝝁 ,   𝜮   =   1  ( 2 𝜋 ) 𝑛 / 2   𝜮   1 / 2   𝑒 − 1  2   𝑿 − 𝝁   𝑇 𝜮 − 1 ( 𝑿 − 𝝁 )  𝑦   𝑦   𝑦  𝜮   =   Σ 1 , 1   Σ 1 , 2  Σ 2 , 1   Σ 2 , 2   𝜮   =   Σ 1 , 1   0  0   Σ 2 , 2  𝜮   =   𝝈 𝟐   𝟏   0  0   𝟏   =   𝝈 𝟐 𝚰
Mixture  models   –  thinking  generatively
Mixture  models   –  thinking  generatively
A generative  model
Gaussian  mixture model
Mixture model optimisation   –   the Expectation -  Maximization (EM) algorithm
Mixture model optimisation   –   the Expectation -  Maximization (EM) algorithm  Ƹ  𝜇 𝑘   =   1  ෡ 𝑁 𝑘  ෍  𝑖 = 1  𝑁  𝑞 𝑖𝑘 𝑥 𝑖  ෡ 𝑁 𝑘   =   ෍  𝑖 = 1  𝑁  𝑞 𝑖 𝑘   ෡ 𝜮 𝑘   =   1  ෡ 𝑁 𝑘  ෍  𝑖 = 1  𝑁  𝑞 𝑖𝑘 ( 𝑥 𝑖 −   Ƹ 𝜇 𝑘 ) ( 𝑥 𝑖   −   Ƹ   𝜇 𝑘 ) 𝑇
Algorithm in operation  Initial guess
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Update q_nk and  then other  parameters.
Algorithm in operation  Solution at  convergence
Mixture model clustering
Mixture model  clustering
Mixture  model   –  issues
Likelihood increase
What can we do?
Mixture models  –   other  distributions
Binary example
Binary example
Summary
