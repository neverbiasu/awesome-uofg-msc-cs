# Conda_-_Practical_Exercises

# Conda Practical Exercises

## Exercise 1: Setting Up Conda

__Task:__ Install Miniconda or Anaconda on your system\.

__Task:__ Verify the installation

conda –version

__Task:__ Update Conda to the latest version

conda update conda

## Exercise 2: Creating and Activating an Environment

__Task:__ Create a new environment named data\_science with Python 3\.8

conda create \-\-name data\_science python=3\.8

__Task:__ Activate the data\_science environment

conda activate data\_science

__Task:__ Deactivate the environment\.

conda deactivate

## Exercise 3: Installing and Managing Packages

__Task:__ Install the following packages in your data\_science environment: NumPy, Pandas, and Matplotlib\.

conda install numpy pandas matplotlib

__Task:__ Update the Pandas package to the latest version

conda update pandas

__Task:__ Remove the Matplotlib package

conda remove matplotlib

## Exercise 4: Exporting and Sharing Environments

__Task:__ Export your data\_science environment to a YAML file named data\_science\_env\.yml\.

conda env export > data\_science\_env\.yml

__Task:__ Create a new environment from the exported YAML file

conda env create \-f data\_science\_env\.yml

