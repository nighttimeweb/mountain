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

  // 3. Set .hero margin dynamically based on header height
  const heroSection = document.querySelector(".hero");
  if (header && heroSection) {
    function updateHeroMargin() {
      const headerHeight = header.offsetHeight;
      heroSection.style.marginTop = headerHeight + "px";
    }
    updateHeroMargin(); // Initial run on load
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateHeroMargin, 200);
    });
  }

  // 4. FAQ Accordion
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

  // 5. Animated Counters
  const statsSection = document.querySelector(".stats");
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  const animateCounter = (el) => {
    const target = +el.getAttribute("data-target");
    const duration = 1500;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        el.textContent = target + (el.getAttribute("data-target").includes("+") ? "+" : "");
      } else {
        el.textContent = Math.ceil(current);
      }
    }, stepTime);
    el.dataset.animated = "true";
  };
  if (statsSection && statNumbers.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            statNumbers.forEach((num) => {
              if (!num.dataset.animated) animateCounter(num);
            });
            observer.unobserve(statsSection);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(statsSection);
  }

  // 6. Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  // 7. Mobile Dropdown Toggle
  if (window.innerWidth <= 768) {
    document.querySelectorAll("[data-dropdown]").forEach((drop) => {
      const link = drop.querySelector("a");
      link.addEventListener("click", (e) => {
        e.preventDefault();
        drop.classList.toggle("open");
        document.querySelectorAll("[data-dropdown]").forEach((other) => {
          if (other !== drop) other.classList.remove("open");
        });
      });
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest("[data-dropdown]") && e.target.closest(".main-nav")) {
        document.querySelectorAll("[data-dropdown]").forEach((drop) => drop.classList.remove("open"));
      }
    });
  }

  // 8. Sync details by row (for glossary & FAQ)
  function syncDetailsByRow(containerSel, itemSel) {
    const items = Array.from(document.querySelectorAll(itemSel));
    items.forEach((item, idx) => {
      const summary = item.querySelector("summary");
      summary.addEventListener("click", () => {
        setTimeout(() => {
          const top = item.getBoundingClientRect().top;
          items.forEach((other, i) => {
            if (i !== idx && Math.abs(other.getBoundingClientRect().top - top) < 5) {
              other.open = item.open;
              const icon = other.querySelector(".toggle-icon");
              if (icon) icon.textContent = item.open ? "−" : "+";
            }
          });
        }, 10);
      });
    });
  }
  syncDetailsByRow(".glossary-letter-grid", ".glossary-group");
  syncDetailsByRow(".faq-accordion", ".faq-item");

  // 9. Auto-color SVG map by state name and add initials
  const operatingStates = ["Alabama","Arizona","Arkansas","Georgia","Indiana","Kentucky","Louisiana","Mississippi","Missouri","Montana","Nebraska","Oklahoma","Tennessee","Texas"];
  const stateNameToId = {
    'Alabama': 'AL','Alaska': 'AK','Arizona': 'AZ','Arkansas': 'AR','California': 'CA','Colorado': 'CO','Connecticut': 'CT','Delaware': 'DE','Florida': 'FL','Georgia': 'GA','Hawaii': 'HI','Idaho': 'ID','Illinois': 'IL','Indiana': 'IN','Iowa': 'IA','Kansas': 'KS','Kentucky': 'KY','Louisiana': 'LA','Maine': 'ME','Maryland': 'MD','Massachusetts': 'MA','Michigan': 'MI','Minnesota': 'MN','Mississippi': 'MS','Missouri': 'MO','Montana': 'MT','Nebraska': 'NE','Nevada': 'NV','New Hampshire': 'NH','New Jersey': 'NJ','New Mexico': 'NM','New York': 'NY','North Carolina': 'NC','North Dakota': 'ND','Ohio': 'OH','Oklahoma': 'OK','Oregon': 'OR','Pennsylvania': 'PA','Rhode Island': 'RI','South Carolina': 'SC','South Dakota': 'SD','Tennessee': 'TN','Texas': 'TX','Utah': 'UT','Vermont': 'VT','Virginia': 'VA','Washington': 'WA','West Virginia': 'WV','Wisconsin': 'WI','Wyoming': 'WY'
  };

  const svgObj = document.getElementById("us-map");
  if (svgObj) {
    svgObj.addEventListener("load", function () {
      const svgDoc = svgObj.contentDocument;
      const tooltip = document.getElementById("map-tooltip");
      operatingStates.forEach((name) => {
        const id = stateNameToId[name];
        const stateEl = svgDoc.getElementById(id);
        if (!stateEl) return;
        stateEl.style.fill = "#2ECC71";
        stateEl.querySelectorAll("title").forEach(t => t.remove());
        stateEl.addEventListener("mouseenter", () => {
          tooltip.textContent = name;
          tooltip.style.opacity = 1;
        });
        stateEl.addEventListener("mousemove", (e) => {
          tooltip.style.left = (e.clientX + 15) + "px";
          tooltip.style.top = (e.clientY + 15) + "px";
        });
        stateEl.addEventListener("mouseleave", () => {
          tooltip.style.opacity = 0;
        });
        const bbox = stateEl.getBBox();
        const cx = bbox.x + bbox.width/2, cy = bbox.y + bbox.height/2;
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", "14");
        circle.setAttribute("fill", "#ffffff");
        circle.setAttribute("stroke", "#1A4D2E");
        circle.setAttribute("stroke-width", "1.5");
        circle.setAttribute("pointer-events", "none");
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", cx);
        text.setAttribute("y", cy);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "central");
        text.setAttribute("fill", "#1A4D2E");
        text.setAttribute("stroke", "#000");
        text.setAttribute("stroke-width", "0.6");
        text.setAttribute("paint-order", "stroke");
        text.setAttribute("font-size", "16");
        text.setAttribute("font-weight", "600");
        text.setAttribute("font-family", "Arial, sans-serif");
        text.setAttribute("pointer-events", "none");
        text.textContent = id;
        svgDoc.documentElement.append(circle, text);
      });
    });
  }

  // 10. Annuity Calculator Logic
  const investmentAmountInput = document.getElementById("investmentAmount");
  const investmentDurationInput = document.getElementById("investmentDuration");
  const apyDisplay = document.getElementById("apyDisplay");
  const durationLabel = document.getElementById("durationLabel");
  const totalInterestDisplay = document.getElementById("totalInterest");
  const projectedBalanceDisplay = document.getElementById("projectedBalance");
  const totalWithdrawalsDisplay = document.getElementById("totalWithdrawals");
  const freeWithdrawalRiderInput = document.getElementById("freeWithdrawalRider");
  const freeWithdrawalPctInput = document.getElementById("freeWithdrawalPct");
  const chartCanvas = document.getElementById("projectionChart");
  const withdrawalOptions = document.getElementById("withdrawalOptions");

  let projectionChart;

  function getApyForDuration(duration) {
    return duration <= 2 ? 5.25 : 5.75;
  }

  function formatCurrency(value) {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }

  function calculateProjection() {
    let amount = parseFloat(investmentAmountInput.value);
    const duration = parseInt(investmentDurationInput.value, 10);
    if (isNaN(amount) || amount < 1000) amount = 1000;
    if (amount > 100000000) amount = 100000000;

const withdrawalsEnabled = document.querySelector('input[name="withdrawalsEnabled"]:checked')?.value === "Y";
    const freeWithdrawalRider = freeWithdrawalRiderInput?.value === "Y";
    const withdrawalPct = parseFloat(freeWithdrawalPctInput?.value || (freeWithdrawalRider ? 10 : 5)) / 100;

    let apy = getApyForDuration(duration);
    if (withdrawalsEnabled && freeWithdrawalRider) {
      apy -= 0.25;
    }
    apyDisplay.textContent = `${apy.toFixed(2)}%`;
    durationLabel.textContent = `${duration} ${duration === 1 ? "year" : "years"}`;

    let balance = amount;
    let totalInterest = 0;
    let totalWithdrawals = 0;
    const dataPoints = [{ year: 0, balance }];

    if (withdrawalsEnabled) {
      for (let y = 1; y <= duration; y++) {
        const annualWithdrawal = (y === 1 && !freeWithdrawalRider) ? 0 : balance * withdrawalPct;
        const monthlyWithdrawal = annualWithdrawal / 12;

        for (let m = 1; m <= 12; m++) {
          const interest = balance * (apy / 100) / 12;
          balance += interest;
          totalInterest += interest;
          balance -= monthlyWithdrawal;
          totalWithdrawals += monthlyWithdrawal;
        }
        dataPoints.push({ year: y, balance: parseFloat(balance.toFixed(2)) });
      }
    } else {
      for (let y = 1; y <= duration; y++) {
        balance *= 1 + apy / 100;
        dataPoints.push({ year: y, balance: parseFloat(balance.toFixed(2)) });
      }
      totalInterest = balance - amount;
    }

    totalInterestDisplay.textContent = formatCurrency(totalInterest);
    projectedBalanceDisplay.textContent = formatCurrency(balance);
    if (totalWithdrawalsDisplay) {
      totalWithdrawalsDisplay.textContent = formatCurrency(totalWithdrawals);
    }
    updateChart(dataPoints);
  }

  function updateChart(data) {
    const labels = data.map(p => p.year);
    const balances = data.map(p => p.balance);
    if (projectionChart) projectionChart.destroy();
    projectionChart = new Chart(chartCanvas.getContext("2d"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Projected Balance",
          data: balances,
          borderColor: "#1A4D2E",
          backgroundColor: "rgba(26,77,46,0.15)",
          fill: true,
          tension: 0.25,
          pointBackgroundColor: "#1A4D2E",
          pointRadius: 4,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            ticks: { callback: v => `$${(v/1000).toFixed(0)}k` }
          },
          x: {
            title: { display: true, text: "Year" }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => {
                let lbl = ctx.dataset.label ? ctx.dataset.label + ": " : "";
                return lbl + formatCurrency(ctx.parsed.y);
              }
            }
          }
        }
      }
    });
  }

  if (investmentAmountInput && investmentDurationInput && chartCanvas) {
    calculateProjection();
    investmentAmountInput.addEventListener("input", calculateProjection);
    investmentDurationInput.addEventListener("input", calculateProjection);
    document.querySelectorAll('input[name="withdrawalsEnabled"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const isEnabled = document.querySelector('input[name="withdrawalsEnabled"]:checked')?.value === "Y";
    withdrawalOptions.style.display = isEnabled ? "block" : "none";
    calculateProjection();
  });
});

    freeWithdrawalRiderInput?.addEventListener("change", calculateProjection);
    freeWithdrawalPctInput?.addEventListener("input", calculateProjection);
  }
// 11. Save Results as PDF (NEW IMPLEMENTATION)
const saveBtn = document.getElementById("saveResultsButton");

if (saveBtn) {
  saveBtn.addEventListener("click", async () => {
    if (typeof html2pdf === "undefined") {
      alert("PDF generation library (html2pdf.js) is not loaded. Please contact support.");
      return;
    }

    // Ensure calculations are fresh
    calculateProjection();

    const templateElement = document.getElementById("pdfReportTemplate");
    if (!templateElement) {
      alert("PDF report template not found. Please contact support.");
      return;
    }
    const reportHTMLString = templateElement.innerHTML;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = reportHTMLString;
    const reportContentElement = tempDiv.querySelector(".report-container");
    if (!reportContentElement) {
      alert("PDF report content container not found in template. Please contact support.");
      return;
    }

    // Wait briefly to ensure chart is rendered before capturing
    await new Promise(resolve => setTimeout(resolve, 300));
    const chartDataUrl = chartCanvas ? chartCanvas.toDataURL("image/png") : "";

    // Gather data for PDF
    const calculatorData = {
      dateGenerated: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      footerYear: new Date().getFullYear(),
      investmentAmount: parseFloat(investmentAmountInput.value),
      duration: parseInt(investmentDurationInput.value, 10),
      apy: parseFloat(apyDisplay.textContent),
      withdrawalsEnabled: document.querySelector("input[name=\"withdrawalsEnabled\"]:checked")?.value === "Y",
      freeWithdrawalRider: freeWithdrawalRiderInput?.value === "Y",
      withdrawalPct: parseFloat(freeWithdrawalPctInput?.value || (freeWithdrawalRiderInput?.value === "Y" ? 10 : 5)) / 100,
      projectedBalance: parseFloat(projectedBalanceDisplay.textContent.replace(/[^\d.-]/g, "")),
      totalInterest: parseFloat(totalInterestDisplay.textContent.replace(/[^\d.-]/g, "")),
      totalWithdrawals: parseFloat(totalWithdrawalsDisplay.textContent.replace(/[^\d.-]/g, "")),
      annualProjection: window.detailedAnnualPDFData || [],
      chartDataUrl: chartDataUrl
    };

    // Populate the cloned template
    reportContentElement.querySelector("#report_date").textContent = calculatorData.dateGenerated;
    reportContentElement.querySelector("#footer_year").textContent = calculatorData.footerYear;
    reportContentElement.querySelector("#input_investment_amount").textContent = formatCurrency(calculatorData.investmentAmount);
    reportContentElement.querySelector("#input_investment_duration").textContent = calculatorData.duration + (calculatorData.duration === 1 ? " Year" : " Years");
    reportContentElement.querySelector("#input_apy").textContent = calculatorData.apy.toFixed(2) + "%";
    reportContentElement.querySelector("#input_withdrawals_enabled").textContent = calculatorData.withdrawalsEnabled ? "Yes" : "No";

    const withdrawalDetailsDivPdf = reportContentElement.querySelector("#js_withdrawal_details_placeholder_pdf");
    if (calculatorData.withdrawalsEnabled) {
      let withdrawalHtml = `<span class="data-label">Free Withdrawal Rider:</span> <span class="data-value">${calculatorData.freeWithdrawalRider ? "Yes (10% Free Withdrawal)" : "No (5% Standard)"}</span><br>`;
      withdrawalHtml += `<span class="data-label">Annual Withdrawal %:</span> <span class="data-value">${(calculatorData.withdrawalPct * 100).toFixed(2)}%</span>`;
      withdrawalDetailsDivPdf.innerHTML = withdrawalHtml;
      withdrawalDetailsDivPdf.style.display = "block";
    } else {
      withdrawalDetailsDivPdf.innerHTML = "";
      withdrawalDetailsDivPdf.style.display = "none";
    }

    reportContentElement.querySelector("#output_projected_balance").textContent = formatCurrency(calculatorData.projectedBalance);
    reportContentElement.querySelector("#output_total_interest").textContent = formatCurrency(calculatorData.totalInterest);
    reportContentElement.querySelector("#output_total_withdrawals").textContent = formatCurrency(calculatorData.totalWithdrawals);

    const tableBodyPdf = reportContentElement.querySelector("#annual_projection_table_body_pdf");
    const annualSectionPdf = reportContentElement.querySelector("#annual_projection_section_pdf");
    tableBodyPdf.innerHTML = "";
    if (calculatorData.annualProjection.length > 0) {
      calculatorData.annualProjection.forEach(yearData => {
        const row = tableBodyPdf.insertRow();
        row.insertCell().textContent = yearData.year;
        row.insertCell().textContent = formatCurrency(yearData.startingBalance);
        row.insertCell().textContent = formatCurrency(yearData.interestEarned);
        row.insertCell().textContent = formatCurrency(yearData.withdrawals);
        row.insertCell().textContent = formatCurrency(yearData.endingBalance);
      });
      annualSectionPdf.style.display = "block";
    } else {
      annualSectionPdf.style.display = "none";
    }

    if (calculatorData.chartDataUrl) {
      reportContentElement.querySelector("#chart_image_placeholder_pdf").src = calculatorData.chartDataUrl;
    } else {
      reportContentElement.querySelector(".chart-container-pdf").style.display = "none";
    }

    // Generate PDF
    const pdfFilename = "Mountain_Life_Annuity_Estimate_" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + ".pdf";
    const opt = {
      margin: [15, 10, 15, 10],
      filename: pdfFilename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] }
    };

    html2pdf().from(reportContentElement).set(opt).save();
    });
  }
});


  // 12. Preloader
  const preloader = document.querySelector(".preloader");
  const progressFill = document.querySelector(".progress-fill");
  if (preloader && progressFill) {
    const start = performance.now();
    window.addEventListener("load", () => {
      const duration = Math.min(Math.max(performance.now() - start, 400), 3000);
      progressFill.style.transition = `width ${duration}ms linear`;
      progressFill.style.width = "100%";
      setTimeout(() => preloader.classList.add("hidden"), duration);
    });
  }
