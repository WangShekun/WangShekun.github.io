export const profile = {
  name: "Shekun Wang",
  email: "wangshekun@mail.nwpu.edu.cn",
  github: "https://github.com/WangShekun",
  orcid: "https://orcid.org/0009-0006-2958-2747",
  googleScholar: "https://scholar.google.com/citations?user=T9wCkoAAAAAJ&hl=en",
  linkedin: "https://www.linkedin.com/in/shekun-wang-12bb9a438",
};

export const education = [
  {
    degree: "M.Eng. in Aerospace Science and Technology",
    institution: "Northwestern Polytechnical University",
    period: "Sep 2024 – Apr 2027 (expected)",
    details: "",
  },
  {
    degree: "B.Eng. in Aircraft Design and Engineering",
    institution: "Northwestern Polytechnical University",
    period: "Sep 2020 – Jun 2024",
    details: "Outstanding Graduate",
  },
];

export const research = [
  {
    number: "01",
    title: "Uncertainty quantification",
    description:
      "Understanding how uncertain inputs affect engineering predictions, with a focus on reliable uncertainty propagation in computationally expensive simulations.",
  },
  {
    number: "02",
    title: "Data-efficient modeling",
    description:
      "Building accurate and reliable surrogate models when simulation data are scarce and input spaces are high-dimensional.",
  },
  {
    number: "03",
    title: "Robust aircraft design",
    description:
      "Balancing aerodynamic performance and robustness through design optimization under uncertain operating conditions and design parameters.",
  },
];

type Publication = {
  title: string;
  venue: string;
  year: string;
  note?: string;
  href?: string;
  abstract?: string;
  context?: string;
};

// Published articles only; metadata follows the supplied CV.
export const publications: Publication[] = [
  {
    title:
      "Sparse Arbitrary Polynomial Chaos for High-Dimensional Problems Based on Moment-Constrained Projection Dimensionality Reduction",
    venue: "Reliability Engineering & System Safety",
    year: "2026",
    note: "Published · bibliographic details to follow",
    href: undefined,
    abstract:
      "Polynomial chaos surrogate modeling for high-dimensional uncertainty quantification under limited training data remains challenging when inputs are high-dimensional, nonstandard, or only partially characterized, which often lead to low efficiency, poor accuracy, and weak robustness. As a data-driven extension of polynomial chaos, arbitrary polynomial chaos (aPC) constructs orthogonal polynomial bases directly from sample moments. Consequently, its performance depends strongly on the statistical quality and numerical conditioning of the reduced variables. To address this issue, this paper proposes a Moment-Constrained Projection (MCP) method for dimensionality reduction and couples it with aPC to develop an MCP-aPC surrogate modeling framework. Under an orthogonality constraint, MCP regularizes the second order statistical structure and preserves low order moment information in the reduced space, thereby improving the numerical stability of reduced space aPC construction. A supervised term can also be introduced when response information is available. In principle, the reduced dimension and MCP hyperparameters can be treated as joint candidates under leave-one-out (LOO) model selection. Results on analytical benchmark functions up to 300 dimensions, stochastic heat conduction PDE field prediction, and transonic aerodynamic modeling of the M6 wing show that MCP-aPC consistently achieves the lowest prediction errors, especially for small sample sizes, and the strongest robustness over repeated experiments. It also requires substantially smaller reduced dimensions than competing dimensionality reduction-based aPC methods and generally outperforms standard PCE and aPC.",
  },
  {
    title:
      "Gradient-Residual Aware Subspace-Enhanced Arbitrary Polynomial Chaos-Kriging for High-Dimensional Surrogate Modeling",
    venue: "Engineering with Computers",
    year: "2026",
    note: "Published",
    href: undefined,
    abstract:
      "To address complex engineering modeling problems with limited high-fidelity data, this paper establishes a gradient-enhanced arbitrary polynomial chaos-Kriging (GE-aPCK) model. It combines an arbitrary polynomial chaos trend with a Gaussian-process residual and uses function values and gradients to constrain both global and local response components. Because full gradient augmentation introduces one derivative channel per input variable, its training system becomes expensive in high dimensions. We therefore develop a low-rank extension of GE-aPCK based on the Gradient-Residual Aware Subspace (GRAS). The resulting formulation replaces coordinate-wise gradients with a small number of projected directional derivatives, reducing the augmented system while preserving the universal Kriging predictor and the validity of the projected covariance. GRAS constructs the projection basis by combining gradient-norm sample weighting with a residual-correction subspace from a pilot polynomial trend. The residual rank is selected by balancing pilot-regression error and unrecovered gradient energy, so retained directions reflect dominant gradient activity and trend-unexplained derivative content. Across analytical, PDE, and aerodynamic benchmarks, GRAS generally improves over arbitrary polynomial chaos-Kriging (aPCK) and approaches the accuracy of full GE-aPCK. It reduces surrogate-training time by over 200-fold in the 50-dimensional heat-transfer case. In the 40-variable aerodynamic case at Ntrain = 300, rank-5 GRAS reduces RelMSE by factors of 1.5–7.8 and training time by factors of 66.6–224 relative to full GE-aPCK across the three outputs.",
  },
  {
    title:
      "An adaptive weighted lasso regression method for sparse polynomial chaos expansion: Application to multi-source uncertainty quantification",
    venue: "Reliability Engineering & System Safety",
    year: "2026",
    note: "Published",
    href: "https://doi.org/10.1016/j.ress.2026.112832",
    abstract:
      "As an efficient uncertainty quantification (UQ) method, polynomial chaos expansion (PCE) alleviates the curse of dimensionality for computationally expensive models. However, many sparse PCE variants prioritize basis reduction and training efficiency rather than reconstruction stability, noise robustness, and small-sample generalization, thereby limiting practicality in high-dimensional or data-scarce engineering contexts. This paper proposes a sparse PCE construction method based on adaptive weighted Lasso (wLasso). Specifically, initial PCE coefficients are first estimated by regression such as Least Angle Regression, and data-driven adaptive weights are incorporated into a convex weighted ℓ1-regularized problem to impose differential shrinkage on influential and irrelevant terms. By extending wLasso theory to PCE, it is theoretically proven that the proposed wLasso–PCE ensures consistent basis selection, asymptotically unbiased estimation, and optimal convergence, with an explicit approximation–statistical error trade-off. The algorithm is implemented on classical benchmark functions, transonic aerodynamics and sonic boom propagation UQ. Compared with mainstream PCE, wLasso–PCE attains target accuracy with far fewer basis terms and samples while stabilizing basis selection under finite data. Supported by oracle-type guarantees and an approximation–statistical error decomposition, it forms a sample-efficient, interpretable, and deployable UQ module for high-dimensional or small-sample scenarios.",
  },
  {
    title:
      "Multipoint Inverse Design Method for an Integrated Tail-Propulsive Propeller in Canard Rotor-Wing UAV",
    venue: "IEEE Transactions on Aerospace and Electronic Systems",
    year: "2026",
    note: "Published",
    href: "https://doi.org/10.1109/TAES.2026.3689077",
    abstract:
      "Urban air mobility and emergency response applications demand uncrewed aerial vehicles capable of efficient high-speed cruise, low-speed loiter, and vertical takeoff/landing. The Canard Rotor/Wing (CRW) configuration uniquely integrates these trimodal capabilities. To address thrust deficit during cruise acceleration and parasitic weight penalties in CRW uncrewed aerial vehicle tail rotors, this article proposes an integrated tail-propulsive propeller (ITPP). The ITPP must simultaneously satisfy conflicting aerodynamic requirements: static thrust during hover and high-efficiency thrust generation at high advance ratio. Further, an inverse design methodology is proposed for multipoint operating conditions to satisfy this requirement. The design architecture is an inverse method constructed upon standard strip analysis, implemented in a MATLAB environment with airfoil data computed using the XFOIL solver. The design is guided by the principle of minimum energy loss, and a variable-pitch mechanism is incorporated to mitigate incidence angle conflicts. A critical feature is a radial-position-dependent optimization strategy, which prioritizes drag reduction at the root and tip, and lift-drag tradeoff at mid-span. Aerodynamic data is normalized prior to synthesis to ensure unbiased selection. The final design concurrently achieves high static thrust for low-speed flight and high efficiency at high-speed cruise. Design case studies validate that the dual-point inversely designed propeller simultaneously meets thrust requirements at both design conditions while demonstrating superior overall efficiency relative to single-point reference propellers. The methodology’s efficacy in designing propellers for wide-spanning operating conditions is substantiated.",
  },
];

// Conference titles and abstracts follow the official ICAS archive records.
export const conferencePublications: Publication[] = [
  {
    title:
      "Sparse Polynomial Chaos-Based Robust Optimization Design of Aerodynamic and Sonic Boom",
    venue:
      "35th Congress of the International Council of the Aeronautical Sciences (ICAS)",
    year: "2026",
    context: "Sydney, Australia · Oral presentation",
    href: "https://www.icas.org/icas_archive/icas2026/data/preview/icas2026_0235.htm",
    abstract:
      "This work presents a sparse polynomial chaos based framework for robust aerodynamic and sonic boom optimization design under multi-source uncertainty. The method enables uncertainty quantification and robust optimization design with limited samples, reducing computational cost while enhancing the robustness of aerodynamic and sonic boom designs under uncertain flight and atmospheric conditions.",
  },
  {
    title:
      "Sparse Polynomial Chaos-Based Sonic Boom Uncertainty Quantification and Aerodynamic/Sonic Boom Robust Design Optimization under Multi-Parameter Uncertainties",
    venue:
      "34th Congress of the International Council of the Aeronautical Sciences (ICAS)",
    year: "2024",
    context: "Florence, Italy · Oral presentation",
    href: "https://www.icas.org/icas_archive/icas2024/data/preview/icas2024_0373.htm",
    abstract:
      "This paper uses the AFBS method for aircraft aerodynamic/sonic boom uncertainty quantification. Establishing a multidisciplinary robust optimal design framework that conducts aerodynamic/sonic boom uncertainty quantification can meet the design requirements of the environment-friendly supersonic civil aircraft.",
  },
];
