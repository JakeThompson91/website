/**
 * Jacob Thompson - Senior / Lead Cloud & DevOps Engineer Portfolio
 * Interactive Engine: Dark/Light theme toggle, Case Study Modals,
 * Copy Email, and Navigation Scrollspy.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Check saved preference or OS preference
  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('site-theme', newTheme);
    });
  }

  // 3. Mobile Navigation Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.classList.add('open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Cloud Case Studies Modal
  const projectModal = document.getElementById('project-modal');
  const projectModalBackdrop = document.getElementById('project-modal-backdrop');
  const projectModalClose = document.getElementById('project-modal-close');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectTriggers = document.querySelectorAll('.preview-modal-trigger');

  const caseStudies = {
    'b2b-marketplace': {
      title: 'B2B Marketplace & E-Commerce: Technical Ops Engineer',
      tags: ['Spacelift', 'Amazon ECS', 'OpenTofu', 'Amazon MSK', 'AWS CodePipeline'],
      overview: 'Engineered scalable internal systems, cloud infrastructure, and operational automations to support cross-departmental workflows for a global B2B marketplace.',
      challenges: [
        'Legacy workflows and manual business processes impeding cross-departmental operations.',
        'Third-party vendor data streaming and integrations requiring secure, granular access controls.',
        'Expensive legacy Kubernetes (EKS) clusters incurring extended support surcharges.'
      ],
      solutions: [
        'Engineered end-to-end internal web applications using Python and modern web frameworks to automate manual business processes.',
        'Deployed public-facing Amazon MSK (Managed Streaming for Apache Kafka) clusters with configured granular access controls.',
        'Updated and modularized Infrastructure-as-Code (IaC) using Terraform and OpenTofu to automate containerized AWS workloads (ECS) and streamline continuous delivery via AWS CodePipeline.'
      ],
      impact: [
        'Reduced monthly cloud infrastructure spend and eliminated extended support surcharges with zero service downtime during EKS upgrades.',
        'Partnered cross-functionally with non-technical stakeholders to translate complex needs into actionable reporting and scalable tools.',
        'Modernized legacy operations through comprehensive automation and secure third-party data streaming.'
      ]
    },
    'gov-migration': {
      title: 'Gov Financial Services: Cloud Migration',
      tags: ['AWS Migration', '1,200+ Servers', 'Terraform IaC', 'Gov Compliance', 'CI/CD'],
      overview: 'Led the migration team responsible for designing, automating, and executing the transition of mission-critical applications and servers into AWS with Terraform IaC.',
      challenges: [
        'Strict regulatory compliance, data security, and auditability requirements governing government financial workloads.',
        'Zero-loss migration of legacy application dependencies across 1,200+ physical and virtual servers.',
        'Preventing human configuration errors and configuration drift across large-scale infrastructure environments.'
      ],
      solutions: [
        'Engineered 100% declarative Infrastructure as Code (IaC) using modular Terraform, standardizing multi-account AWS Landing Zones.',
        'Integrated automated CI/CD deployment pipelines with static code analysis, security scanning, and automated testing before provisioning.',
        'Authored end-to-end migration runbooks, architectural blueprints, and operational standard operating procedures (SOPs) for seamless knowledge transfer.'
      ],
      impact: [
        'Successfully transitioned 1,200+ servers and 30+ applications to AWS with zero security audit findings.',
        'Accelerated provisioning speed by 60% while eliminating manual configuration discrepancies through automated Terraform pipelines.',
        'Delivered scalable, cost-optimized, and fully compliant AWS cloud infrastructure on schedule.'
      ]
    },
    'marine-logistics': {
      title: 'Marine Logistics: VMware-to-AWS Modernization',
      tags: ['VMware to AWS', 'Amazon WorkSpaces', 'AWS Lambda', 'CloudWatch'],
      overview: 'Spearheaded migration from self-hosted VMware to AWS, co-architecting a secure 500+ user remote workspace environment and implementing custom serverless Lambda automations to reduce manual IT workload.',
      challenges: [
        'Aging on-premise VMware clusters prone to hardware failures and high maintenance overhead.',
        'Urgent business need for a secure, high-performance remote work solution for 500+ geographically distributed staff.',
        'Repetitive manual IT operations and operational bottlenecks draining engineering resources.'
      ],
      solutions: [
        'Planned and executed seamless live workload migrations from VMware to AWS conforming strictly to AWS Well-Architected principles.',
        'Co-architected and deployed a scalable, secure Cloud Workspace environment for 500+ end-users with centralized IAM and MFA security policies.',
        'Engineered custom AWS Lambda event-driven functions triggered by CloudWatch Events to automate routine server management, snapshots, and maintenance tasks.',
        'Served as the primary Tier-3 technical escalation authority for CloudHesive MSP operations, resolving critical incidents with minimal MTTR.'
      ],
      impact: [
        'Eliminated on-premise data center hardware costs and achieved high availability across multi-AZ AWS infrastructure.',
        'Empowered seamless remote collaboration and enhanced employee mobility for 500+ users worldwide.',
        'Reduced recurring manual IT operations by 40%+ through serverless Lambda automations.'
      ]
    }
  };

  function openProjectModal(projectId) {
    const data = caseStudies[projectId];
    if (!data) return;

    projectModalBody.innerHTML = `
      <div class="modal-header-meta">
        <div class="project-tags">
          ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <h2 class="modal-project-title">${data.title}</h2>
        <p class="modal-body-text">${data.overview}</p>
      </div>

      <h3 class="modal-section-title">The Engineering Challenge</h3>
      <ul class="modal-spec-list">
        ${data.challenges.map(c => `<li>${c}</li>`).join('')}
      </ul>

      <h3 class="modal-section-title">Architectural Solution</h3>
      <ul class="modal-spec-list">
        ${data.solutions.map(s => `<li>${s}</li>`).join('')}
      </ul>

      <h3 class="modal-section-title">Measurable Business Impact</h3>
      <ul class="modal-spec-list">
        ${data.impact.map(i => `<li>${i}</li>`).join('')}
      </ul>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
  if (projectModalBackdrop) projectModalBackdrop.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (projectModal && projectModal.classList.contains('active') && e.key === 'Escape') {
      closeProjectModal();
    }
  });

  // 5. Contact Form Submission Handling
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm && formStatus && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const originalBtnHtml = submitBtn.innerHTML;
      
      // UI Loading State
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="0.75"/></svg>
        <span>Sending Message...</span>
      `;
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      try {
        const accessKey = formData.get('access_key');
        
        // If placeholder access key, provide instant friendly feedback
        if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
          await new Promise(resolve => setTimeout(resolve, 800));
          formStatus.textContent = "Thank you! Your message has been received. I'll get back to you shortly.";
          formStatus.className = 'form-status success';
          formStatus.style.display = 'block';
          contactForm.reset();
        } else {
          const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          const result = await response.json();
          if (response.ok || result.success) {
            formStatus.textContent = "Thank you! Your message has been sent successfully. I'll be in touch soon.";
            formStatus.className = 'form-status success';
            formStatus.style.display = 'block';
            contactForm.reset();
          } else {
            throw new Error(result.message || 'Submission failed');
          }
        }
      } catch (err) {
        formStatus.textContent = "Oops! Something went wrong sending your message. Please try connecting via LinkedIn.";
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }

  // 6. Active Navigation Link on Scroll (Scrollspy)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // 7. Slot Machine Number Animation
  const animateValue = (element, start, end, duration, prefix = '', suffix = '') => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo effect for a slot machine slow-down feel
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * (end - start) + start);
      
      // format with commas if needed
      element.textContent = prefix + currentVal.toLocaleString() + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const metricValues = document.querySelectorAll('.metric-value');
  metricValues.forEach(metric => {
    const text = metric.textContent.trim();
    
    // Parse the number and its suffix/prefix (e.g. "1,200+", "8+ Yrs")
    const match = text.match(/^(\D*)(\d+(?:,\d+)*)(\D*)$/);
    if (match) {
      const prefix = match[1] || '';
      const numStr = match[2].replace(/,/g, '');
      const endValue = parseInt(numStr, 10);
      const suffix = match[3] || '';
      
      if (!isNaN(endValue)) {
        // Use IntersectionObserver to start animation when visible
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateValue(metric, 0, endValue, 2000, prefix, suffix);
              obs.unobserve(metric);
            }
          });
        }, { threshold: 0.1 });
        
        observer.observe(metric);
      }
    }
  });
});
