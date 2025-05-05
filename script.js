document.addEventListener("DOMContentLoaded", function () {
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: "ease-in-out",
    });
  
    // 2. Sticky Header Scroll Effect
    const header = document.querySelector(".site-header");
    if (header) {
      window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
      });
    }
  
    // 3. FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const summary = item.querySelector("summary");
      const icon = summary.querySelector(".toggle-icon");
  
      summary.addEventListener("click", () => {
        icon.textContent = item.open ? "+" : "−";
      });
  
      item.addEventListener("toggle", () => {
        icon.textContent = item.open ? "−" : "+";
      });
    });
  
    // 4. Animated Counters
    const statsSection = document.querySelector(".stats");
    const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  
    const animateCounter = (element) => {
      const target = +element.getAttribute("data-target");
      const duration = 1500;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;
  
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          element.textContent = target;
          if (element.getAttribute("data-target").includes("+")) {
            element.textContent += "+";
          }
        } else {
          element.textContent = Math.ceil(current);
        }
      }, stepTime);
  
      element.dataset.animated = "true";
    };
  
    if (statsSection && statNumbers.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              statNumbers.forEach((num) => {
                if (num.getAttribute("data-target") && !num.dataset.animated) {
                  animateCounter(num);
                }
              });
              observer.unobserve(statsSection);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(statsSection);
    }
  
    // 5. Mobile Navigation
    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector(".main-nav");
    if (navToggle && mainNav) {
      navToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
      });
    }
  // 6. Mobile Dropdown Toggle
document.querySelectorAll('[data-dropdown]').forEach(drop => {
  const link = drop.querySelector('a');

  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // Prevent default anchor behavior
      drop.classList.toggle('open');

      // Optional: close other open dropdowns
      document.querySelectorAll('[data-dropdown]').forEach(other => {
        if (other !== drop) {
          other.classList.remove('open');
        }
      });
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('[data-dropdown]')) {
    document.querySelectorAll('[data-dropdown]').forEach(drop => {
      drop.classList.remove('open');
    });
  }
});

    // 6. Sync details by row
    function syncDetailsByRow(containerSelector, itemSelector) {
      const container = document.querySelector(containerSelector);
      const items = Array.from(document.querySelectorAll(itemSelector));
  
      if (container && items.length > 0) {
        items.forEach((item, index) => {
          const summary = item.querySelector("summary");
  
          summary.addEventListener("click", () => {
            setTimeout(() => {
              const isNowOpen = item.open;
              const itemTop = item.getBoundingClientRect().top;
  
              items.forEach((other, i) => {
                if (i === index) return;
                const otherTop = other.getBoundingClientRect().top;
                const sameRow = Math.abs(itemTop - otherTop) < 5;
  
                if (sameRow) {
                  other.open = isNowOpen;
                  const icon = other.querySelector(".toggle-icon");
                  if (icon) icon.textContent = isNowOpen ? "−" : "+";
                }
              });
            }, 10);
          });
        });
      }
    }
  
    syncDetailsByRow(".glossary-letter-grid", ".glossary-group");
    syncDetailsByRow(".faq-accordion", ".faq-item");
  
// 7. Auto-color SVG map by state name and add initials with background and custom tooltip
const operatingStates = [
    'Alabama', 'Arizona', 'Arkansas', 'Georgia', 'Indiana', 'Kentucky',
    'Louisiana', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Oklahoma', 'Tennessee', 'Texas'
  ];
  
  const stateNameToId = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND',
    'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI',
    'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
    'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
    'Wisconsin': 'WI', 'Wyoming': 'WY'
  };
  
  const svgObj = document.getElementById("us-map");
  if (svgObj) {
    svgObj.addEventListener("load", function () {
      const svgDoc = svgObj.contentDocument;
      if (!svgDoc) return;
  
      const tooltip = document.getElementById("map-tooltip");
  
      operatingStates.forEach(stateName => {
        const stateId = stateNameToId[stateName];
        const stateEl = svgDoc.getElementById(stateId);
        if (stateEl) {
          // Highlight the state
          stateEl.style.fill = "#2ECC71";
  
          // Remove default title if present
          const oldTitle = stateEl.querySelector("title");
          if (oldTitle) stateEl.removeChild(oldTitle);
  
          // Custom tooltip events
          stateEl.addEventListener("mouseenter", () => {
            tooltip.textContent = stateName;
            tooltip.style.opacity = 1;
          });
          stateEl.addEventListener("mousemove", (e) => {
            tooltip.style.left = (e.clientX + 15) + "px";
            tooltip.style.top = (e.clientY + 15) + "px";
          });
          stateEl.addEventListener("mouseleave", () => {
            tooltip.style.opacity = 0;
          });
  
          // Compute center
          const bbox = stateEl.getBBox();
          const cx = bbox.x + bbox.width / 2;
          const cy = bbox.y + bbox.height / 2;
  
          // Circle background
          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle.setAttribute("cx", cx);
          circle.setAttribute("cy", cy);
          circle.setAttribute("r", "14");
          circle.setAttribute("fill", "#ffffff");
          circle.setAttribute("stroke", "#1A4D2E");
          circle.setAttribute("stroke-width", "1.5");
          circle.setAttribute("pointer-events", "none");
  
          // State initials text
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", cx);
          text.setAttribute("y", cy);
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "central");
          text.setAttribute("fill", "#1A4D2E");
          text.setAttribute("stroke", "#000000");
          text.setAttribute("stroke-width", "0.6"); // thinner stroke
          text.setAttribute("paint-order", "stroke");
          text.setAttribute("font-size", "16");
          text.setAttribute("font-weight", "600"); // less bold
          text.setAttribute("font-family", "Arial, sans-serif");
          text.setAttribute("pointer-events", "none");
          text.textContent = stateId;
  
          // Add circle and text
          svgDoc.documentElement.appendChild(circle);
          svgDoc.documentElement.appendChild(text);
        }
      });
    });
  }
  // 8. Annuity Calculator Logic
const investmentAmountInput = document.getElementById('investmentAmount');
const investmentDurationInput = document.getElementById('investmentDuration');
const apyDisplay = document.getElementById('apyDisplay');
const durationLabel = document.getElementById('durationLabel');
const totalInterestDisplay = document.getElementById('totalInterest');
const projectedBalanceDisplay = document.getElementById('projectedBalance');
const chartCanvas = document.getElementById('projectionChart');
let projectionChart;

function getApyForDuration(duration) {
  return duration <= 2 ? 5.25 : 5.75;
}

function formatCurrency(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function calculateProjection() {
  let amount = parseFloat(investmentAmountInput.value);
  const duration = parseInt(investmentDurationInput.value);
  if (isNaN(amount) || amount < 1000) amount = 1000;
  if (amount > 1000000) amount = 1000000;

  const currentApy = getApyForDuration(duration);
  apyDisplay.textContent = `${currentApy.toFixed(2)}%`;
  durationLabel.textContent = `${duration} ${duration === 1 ? 'year' : 'years'}`;

  let balance = amount;
  const dataPoints = [{ year: 0, balance: balance }];
  for (let year = 1; year <= duration; year++) {
    balance *= (1 + currentApy / 100);
    dataPoints.push({ year, balance: parseFloat(balance.toFixed(2)) });
  }

  const finalBalance = dataPoints[dataPoints.length - 1].balance;
  const totalInterest = finalBalance - amount;

  totalInterestDisplay.textContent = formatCurrency(totalInterest);
  projectedBalanceDisplay.textContent = formatCurrency(finalBalance);
  updateChart(dataPoints);
}

function updateChart(data) {
  const labels = data.map(p => p.year);
  const balances = data.map(p => p.balance);

  if (projectionChart) projectionChart.destroy();

  projectionChart = new Chart(chartCanvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Projected Balance',
        data: balances,
        borderColor: '#1A4D2E',
        backgroundColor: 'rgba(26, 77, 46, 0.15)',
        fill: true,
        tension: 0.25,
        pointBackgroundColor: '#1A4D2E',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: value => `$${(value / 1000).toFixed(0)}k`
          }
        },
        x: {
          title: {
            display: true,
            text: 'Year'
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              if (context.parsed.y !== null) label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      }
    }
  });
}

if (investmentAmountInput && investmentDurationInput && chartCanvas) {
  calculateProjection();
  investmentAmountInput.addEventListener('input', calculateProjection);
  investmentDurationInput.addEventListener('input', calculateProjection);
}

  });
  
