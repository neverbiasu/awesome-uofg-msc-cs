# Enriched Content: ExplainabilityMachineLearning.pdf

This document is a complete and detailed AI-friendly version of the presentation `ExplainabilityMachineLearning.pdf`. All visual content including text, graphs, and diagrams has been meticulously transcribed and described.

---

## Page 1: Title Slide

- **Title**: Explainability in Machine Learning
- **Author**: Dr. Ke Yuan
- **Contact**: ke.yuan@glasgow.ac.uk

---

## Page 2: Can we trust AI's decision?

> **Image Content Analysis:**
> - **Description**: A diagram showing an AI system for loan applications.
> - **Workflow**: A loan application is fed into a "Deep Learning Black-Box", which outputs a decision: "Loan Denied". A question mark points to the black box, indicating the lack of transparency.
> - **Question**: Why was the loan denied? We need explainability.

---

## Page 3: Why is explainability important?

- **Trust**: To trust a model, we need to understand its behavior.
- **Legal/Ethical**: Regulations like GDPR require explanations for automated decisions (the "right to explanation").
- **Debugging**: Explanations help identify flaws and biases in the model.
- **Scientific Discovery**: Understanding what a model has learned can lead to new insights.

---

## Page 4: Interpretable vs. Explainable

- **Interpretable Models**: These are "white-box" or "glass-box" models that are inherently understandable due to their simple structure.
  - Examples: Linear Regression, Logistic Regression, Decision Trees.

- **Explainable AI (XAI)**: This field focuses on developing methods to explain the decisions of complex, "black-box" models.
  - Examples: Deep Neural Networks, Ensemble models (Random Forests, Gradient Boosting).

---

## Page 5: Scope of explanations

- **Global Explanations**: Understanding the model as a whole. What are the most important features across all predictions?
- **Local Explanations**: Understanding a single prediction. Why did the model make this specific decision for this specific data point?

---

## Page 6: LIME (Local Interpretable Model-agnostic Explanations)

- **Core Idea**: To explain a single prediction from a complex model by approximating it with a simple, interpretable model (e.g., a linear model) in the local vicinity of that prediction.

> **Image Content Analysis:**
> - **Description**: A diagram illustrating how LIME works.
> - **Components**:
>   1. A complex, non-linear decision boundary (the black-box model) is shown separating a blue and a pink region.
>   2. A single prediction to be explained (a bold red cross) is highlighted.
>   3. New data points are sampled in the neighborhood of the red cross.
>   4. A simple linear model (a dashed line) is fitted to these local samples. This line provides a local, interpretable approximation of the complex model's behavior around that specific prediction.

---

## Page 7: LIME for Images

> **Image Content Analysis:**
> - **Description**: An example of LIME explaining an image classification.
> - **Process**:
>   1. **Original Image**: A photo of a frog.
>   2. **Segmentation**: The image is broken down into interpretable components or "superpixels".
>   3. **Explanation**: LIME highlights the superpixels that were most influential in the model's decision to classify the image as "tree frog". In this case, the frog's face and parts of its body are highlighted in green (positive contribution).

---

## Page 8: SHAP (SHapley Additive exPlanations)

- **Core Idea**: Based on Shapley values, a concept from cooperative game theory. It calculates the contribution of each feature to a prediction.
- **Shapley Value**: The average marginal contribution of a feature value across all possible coalitions (subsets) of features.

> **Image Content Analysis:**
> - **Description**: A diagram explaining the intuition behind SHAP values.
> - **Formula**: `g(z') = φ₀ + Σ_{i=1 to M} φ_i * z'_i`
>   - `g`: The explanation model.
>   - `z'`: A simplified binary representation of features (1 if present, 0 if absent).
>   - `φ_i`: The Shapley value for feature `i`, representing its contribution to the prediction.

---

## Page 9: SHAP Force Plot

> **Image Content Analysis:**
> - **Description**: A SHAP "force plot" explaining a single prediction.
> - **Components**:
>   - **Base Value**: The average model output over the entire dataset.
>   - **Features**: Features that increase the prediction are shown as red arrows pushing the value to the right. Features that decrease the prediction are shown as blue arrows pushing to the left.
>   - **Final Prediction**: The point where these competing forces balance out.
> - **Interpretation**: This plot provides a clear, quantitative view of which features drove a specific prediction and in which direction.

---

## Page 10: SHAP Summary Plot

> **Image Content Analysis:**
> - **Description**: A SHAP "summary plot" or "beeswarm plot" that provides a global explanation of the model.
> - **Structure**:
>   - Each row represents a feature, ordered by its overall importance.
>   - Each dot on a row is a single prediction (a Shapley value for that feature).
>   - **Color**: The color of the dot represents the feature's value (e.g., red for high, blue for low).
> - **Interpretation**: This plot shows not only which features are most important but also how their value affects the prediction outcome across the entire dataset.

---

## Page 11: Other XAI Methods

- **Integrated Gradients**: A method for attributing a model's prediction to its input features.
- **Counterfactual Explanations**: Describes the smallest change to the feature values that changes the prediction to a different outcome.
- **Concept Activation Vectors (CAVs)**: Helps understand what high-level concepts a neural network has learned.

---

## Page 12: Conclusion

- Explainability is crucial for building trust, ensuring fairness, and debugging complex ML models.
- Methods like LIME and SHAP provide powerful tools for understanding both individual predictions (local) and overall model behavior (global).
- The field of XAI is rapidly evolving, with new techniques constantly being developed.
