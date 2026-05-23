# SECURED SOFTWARE ENGINEERING - MOCK EXAM 2 (REVIEW)

**Course:** Secured Software Engineering  
**Student Performance:** 43.5 / 45 (96.6%)  
**Status:** Completed & Evaluated

---

## 1. Case Study (15 Marks)

### (a) Asset Identification [6/6 Marks]
**Question:** Considering the critical importance of security, identify THREE top assets in this system that require protection, and justify why they are critical.

**Your Answer:**
1. Authentication System: It would be very dangerous if other people get access authorization to remotely control the devices.
2. Smart locks: If smart locks can be disrupted by strangers, the home will be in danger.
3. Cameras: The cameras can show the privacy of the home which is valuable.

**Feedback:** Full marks. You correctly identified both physical IoT assets and critical software components with clear links to safety and privacy.

---

### (b) STRIDE Threat Category [4/4 Marks]
**Question:** An attacker intercepts the communication between the mobile app and the smart lock, altering the "lock" command to an "unlock" command. Identify the specific STRIDE category and explain.

**Your Answer:** This threat is **Tampering** in STRIDE category. Because the attacker alters the “lock” command to an “unlock” command which is a kind of data being maliciously modified.

**Feedback:** Correct. Altering data in transit is the definition of Tampering.

---

### (c) Authorization Strategy [4/5 Marks]
**Question:** Compare DAC and RBAC. Which is more appropriate for managing "Homeowner", "Child", and "Temporary Guest" roles?

**Your Answer:** **RBAC**. Because permissions are managed by roles. People with the same demand would be gathered to a role, while the permission level will align with it. Different roles can access different permissions like Homeowner can access most things.

**Feedback:** Great choice. To get the final point, you should mention that DAC (Discretionary Access Control) is less suitable here because it relies on individual users managing complex access lists for every device, which is prone to error compared to the standardized roles of RBAC.

---

## 2. System Security and Defense Mechanisms (15 Marks)

### (d) Password Inadequacy & 2FA [4/4 Marks]
**Question:** Why is a single password inadequate? Recommend an alternative.

**Your Answer:** Because a single password is easy to break if it did not set the rate limit and once the owner forgets it, it will make it useless. I recommend **2FA** because it requires users to provide two independent authentication factors to verify their identity.

**Feedback:** Correct. 2FA removes the single point of failure.

---

### (e) Security Patterns [6/6 Marks]
**Question:** Describe the primary goal of **Input Validation** and **Secure Logger**.

**Your Answer:** - **Input Validation**: Checking if the input to the system is secure and proper. It mitigates tampering and malicious scripts injection.
- **Secure Logger**: Captures critical security events without leaking sensitive data into log files. It mitigates repudiation and info disclosure.

**Feedback:** Perfect. Especially good connection between Secure Logger and Repudiation.

---

### (f) Fuzzing vs. Penetration Testing [5/5 Marks]
**Question:** Briefly explain both and discuss how they differ.

**Your Answer:** - **Fuzzing**: Generating data with the wrong format to see how the applications react (reliability/security bugs).
- **Penetration Testing**: Simulates real-world attacks to evaluate the security of the system.

**Feedback:** Correct. Fuzzing focuses on malformed input; Pen testing focuses on simulated attacks.

---

## 3. Security Policies and Compliance (15 Marks)

### (g) Bell-LaPadula (BLP) Model [6/6 Marks]
**Question:** Define permissions for Alice [Top Secret] and Bob [Secret] using WURD (Write Up, Read Down).

**Your Answer:** - **Alice**: -rw (Top Secret), -r (Secret), -r (Unclassified)
- **Bob**: -w (Top Secret), -rw (Secret), -r (Unclassified)

**Feedback:** Perfect application of the Star Property and Simple Security Property.

---

### (h) Taint Analysis [4.5/5 Marks]
**Question:** Explain "Taint Source" and "Sensitive Sink". Why is Taint Propagation critical for preventing Injection?

**Your Answer:** - **Taint Source**: Locations where untrusted, external data enters the system.
- **Sensitive Sink**: Security-critical operations where the taint triggers vulnerabilities if unsanitized.
- **Taint Propagation**: Tracks how the taint passes through expressions/functions.

**Feedback:** Excellent. Note: It prevents injection by identifying exactly where sanitization/validation must be placed before data reaches the sink.

---

### (i) GDPR Rights [4/4 Marks]
**Question:** Define "Right to Erasure" and "Right to Data Portability". How to support them technically?

**Your Answer:** - **Right to Erasure**: Subject has the right to obtain erasure of personal data without undue delay.
- **Right to Data Portability**: Subject has the right to receive personal data in a structured, machine-readable format.
- **Technical Support**: Provide API/UI to safely operate the database to erase data and transmit data in a proper format (e.g., JSON).

**Feedback:** Perfect. Covers both the legal definition and the technical implementation.

---

### **FINAL GRADE: 43.5 / 45 (A+)**
