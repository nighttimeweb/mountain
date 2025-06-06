<?php
// front-page.php
get_header();
?>

<!-- Preloader -->
<div class="preloader">
  <div class="preloader-logo-block">
    <img src="<?php echo esc_url( get_template_directory_uri() . '/Mountain_Life_Logo.png' ); ?>" alt="<?php esc_attr_e('Mountain Life Logo', 'mountainlife'); ?>">
    <div class="loading-bar">
      <div class="progress-fill"></div>
    </div>
  </div>
</div>

<main>
  <section class="hero">
    <video class="hero-video" autoplay muted loop playsinline>
      <source src="<?php echo esc_url(get_template_directory_uri() . '/video/backgroundvid1.mp4'); ?>" type="video/mp4">
      <?php esc_html_e('Your browser does not support the video tag.', 'mountainlife'); ?>
    </video>
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <h1 class="animate-headline">
        <?php
          // Editable title
          echo esc_html( get_theme_mod( 'hero_heading', 'Ascend to Financial<br>Security' ) );
        ?>
      </h1>          
      <p class="tagline animate-tagline">
        <?php
          echo wp_kses_post( get_theme_mod( 'hero_tagline', 'Secure your future with Mountain Life Annuities, grounded in trust and inspired by <br>nature.' ) );
        ?>
      </p>
      <a href="#annuities" class="cta-button animate-button">
        <?php echo esc_html( get_theme_mod( 'hero_cta_text', 'Explore Annuities' ) ); ?>
      </a>
    </div>
  </section>

  <section id="about" class="intro-value">
    <div class="container grid-layout">
      <div class="text-content" data-aos="fade-right">
        <h2><?php echo esc_html( get_theme_mod( 'about_heading', "Your Trusted Partner for Life's Journey" ) ); ?></h2>
        <p><?php echo wp_kses_post( get_theme_mod( 'about_paragraph_1', 'Mountain Life Insurance Company has proudly served families since 1972. Originally founded in Tennessee, the company grew through key acquisitions and now operates from its home office in Lexington, Kentucky.' ) ); ?></p>
        <p><?php echo wp_kses_post( get_theme_mod( 'about_paragraph_2', 'With over 50 years of experience, we work with independent agents to protect policyholders across 17 states, offering reliable insurance and annuity products backed by trust, clarity, and care.' ) ); ?></p>
      </div>
      <div class="image-content" data-aos="fade-left" data-aos-delay="200">
        <img src="<?php echo esc_url( get_theme_mod( 'about_image', get_template_directory_uri() . '/placeholder-modern-family.jpg' ) ); ?>" alt="<?php esc_attr_e('Family enjoying secure future', 'mountainlife'); ?>">
      </div>
    </div>
  </section>

  <section id="annuities" class="annuities-luxury">
    <div class="container-luxury">
      <div class="annuities-header">
        <h2><?php echo esc_html( get_theme_mod( 'annuities_heading', 'Secure Summit™ Annuities' ) ); ?></h2>
        <p><?php echo wp_kses_post( get_theme_mod( 'annuities_intro', 'Chart your course to retirement with confidence. Our Multi-Year Guaranteed Annuities offer tax-deferred growth and a shield against market volatility.' ) ); ?></p>
      </div>
      <div class="annuities-grid">
        <div class="annuity-details glass-panel">
          <h3><?php echo esc_html( get_theme_mod( 'annuity_details_title', 'Guaranteed Growth, Lasting Peace' ) ); ?></h3>
          <p><?php echo wp_kses_post( get_theme_mod( 'annuity_details_text', 'Secure Summit helps you reach your retirement goals with guaranteed income streams, safe from market downturns. Enjoy tax-deferred growth, keeping more of your earnings longer, and leverage estate-planning advantages to protect your legacy.' ) ); ?></p>
          <ul>
            <?php 
            $features = get_theme_mod( 'annuity_features', [
              'Predictable, guaranteed rates',
              'Tax-deferred compounding',
              'Protection from market risk',
              'Beneficiary protection',
            ]);
            if ( is_array( $features ) ) {
              foreach ( $features as $feature ) {
                echo '<li>' . esc_html( $feature ) . '</li>';
              }
            }
            ?>
          </ul>
          <a href="<?php echo esc_url( get_theme_mod( 'client_guide_link', get_template_directory_uri() . '/client-guide.pdf' ) ); ?>" class="cta-button-secondary" target="_blank">
            <?php echo esc_html( get_theme_mod( 'client_guide_text', 'View Client Guide' ) ); ?>
          </a>
        </div>
        <div class="annuity-rates glass-panel">
          <h3><?php echo esc_html( get_theme_mod( 'current_rates_heading', 'Current Guaranteed Rates' ) ); ?></h3>
          <p class="rate-effective-date"><?php echo esc_html( get_theme_mod( 'rate_effective_date', 'Effective May 1, 2025' ) ); ?></p>
          <div class="rate-blocks">
            <?php
            $rates = get_theme_mod( 'rate_blocks', [
              ['term' => '2-Year', 'value' => '5.25%'],
              ['term' => '3-Year', 'value' => '5.75%'],
              ['term' => '5-Year', 'value' => '5.75%'],
              ['term' => '7-Year', 'value' => '5.75%'],
              ['term' => '10-Year', 'value' => '5.75%'],
            ]);
            if ( is_array( $rates ) ) {
              foreach ( $rates as $rate ) {
                echo '<div class="rate-block">';
                echo '<span class="rate-term">' . esc_html( $rate['term'] ) . '</span>';
                echo '<span class="rate-value">' . esc_html( $rate['value'] ) . '</span>';
                echo '</div>';
              }
            }
            ?>
          </div>
          <p class="rate-disclaimer-luxury"><?php echo esc_html( get_theme_mod( 'rate_disclaimer', 'Rates subject to change. Rider elections may affect rates.' ) ); ?></p>
          <a href="<?php echo esc_url( get_theme_mod( 'calc_link', get_template_directory_uri() . '/annuity-calculator.html' ) ); ?>" class="link-arrow">
            <?php echo esc_html( get_theme_mod( 'calc_text', 'Calculate Your Growth' ) ); ?>
          </a>
        </div>
      </div>
    </div>
  </section>

  <section id="state-map" class="state-map-section">
    <div class="container">
      <div class="map-card" data-aos="fade-up">
        <h2 class="map-heading"><?php echo esc_html( get_theme_mod( 'map_heading', 'Where We Operate' ) ); ?></h2>
        <p class="map-description"><?php echo esc_html( get_theme_mod( 'map_description', 'We proudly serve customers across the U.S. through independent agents in select states.' ) ); ?></p>
        <div class="map-wrapper" data-aos="fade-up" data-aos-delay="100">
          <object id="us-map" type="image/svg+xml" data="<?php echo esc_url( get_theme_mod( 'map_svg', get_template_directory_uri() . '/us states.svg' ) ); ?>"></object>
        </div>
      </div>
    </div>
  </section>

  <div id="map-tooltip" style="position: absolute; background: #1A4D2E; color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-family: Arial, sans-serif; pointer-events: none; opacity: 0; transition: opacity 0.2s ease, transform 0.2s ease; z-index: 1000; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); transform: translateY(-10px);"></div>

  <section class="trust-credibility">
    <div class="container">
      <h2 data-aos="fade-up"><?php echo esc_html( get_theme_mod( 'trust_heading', 'Built on Decades of Trust' ) ); ?></h2>
      <div class="trust-elements">
        <div class="testimonial" data-aos="fade-up" data-aos-delay="100">
          <blockquote>
            <?php echo wp_kses_post( get_theme_mod( 'testimonial_text', '"Mountain Life made the process simple and clear. I feel confident my family is protected."' ) ); ?>
          </blockquote>
          <cite><?php echo esc_html( get_theme_mod( 'testimonial_cite', '- Rachel T. Bennett — Policyholder from Vermont' ) ); ?></cite>
        </div>
        <div class="stats" data-aos="fade-up" data-aos-delay="200">
          <div class="stat-item">
            <span class="stat-number" data-target="50">0</span>+ <?php esc_html_e('Years', 'mountainlife'); ?>
            <span class="stat-label"><?php echo esc_html( get_theme_mod( 'stat_community', 'Serving Our Community' ) ); ?></span>
          </div>
          <div class="stat-item">
            <span class="stat-number">B+</span>AM Best Rating
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="faq" class="faq-section">
    <div class="container">
      <h2 data-aos="fade-up"><?php echo esc_html( get_theme_mod( 'faq_heading', 'Frequently Asked Questions' ) ); ?></h2>
      <div class="faq-accordion two-column-faq">
        <?php
        $faqs = get_theme_mod( 'faqs', [
          [
            'question' => 'Why buy life insurance?',
            'answer' => '<p>There are essentially two reasons people buy life insurance: they owe someone or they love someone.</p>
              <p>Life insurance helps ensure your financial responsibilities are met if something happens to you. It can:</p>
              <ul>
                <li>Cover funeral costs, mortgages, and other outstanding debts</li>
                <li>Help your loved ones maintain their current standard of living</li>
                <li>Support future goals such as college tuition or charitable giving</li>
              </ul>'
          ],
          [
            'question' => 'When should I buy life insurance?',
            'answer' => '<p>The sooner, the better. It\'s never too early to prepare for the unexpected. When you\'re young and healthy, your risk is lower—so premiums are typically much more affordable.</p>
              <p>As you go through major life events like getting married, having children, or buying a home, it\'s wise to review and adjust your coverage to match your evolving needs.</p>'
          ],
          // Add additional FAQs similarly...
        ]);
        foreach ( $faqs as $index => $faq ) : ?>
          <details class="faq-item" data-aos="fade-up" data-aos-delay="<?php echo esc_attr( $index * 100 ); ?>">
            <summary><?php echo esc_html( $faq['question'] ); ?> <span class="toggle-icon">+</span></summary>
            <div class="faq-content"><?php echo wp_kses_post( $faq['answer'] ); ?></div>
          </details>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section id="contact" class="contact-form-section">
    <div class="container">
      <h2 data-aos="fade-up"><?php echo esc_html( get_theme_mod( 'contact_heading', 'Get In Touch' ) ); ?></h2>
      <p data-aos="fade-up" data-aos-delay="100"><?php echo esc_html( get_theme_mod( 'contact_subheading', 'We’d love to hear from you. Reach out with any questions or to connect with an agent.' ) ); ?></p>
      <div class="contact-info" data-aos="fade-up" data-aos-delay="200">
        <p><strong><?php esc_html_e( 'Address:', 'mountainlife' ); ?></strong> <?php echo esc_html( get_theme_mod( 'contact_address', '2416 Sir Barton Way Suite 110, Lexington, Kentucky 40509' ) ); ?></p>
        <p><strong><?php esc_html_e( 'Phone:', 'mountainlife' ); ?></strong> <a href="tel:18008886542"><?php echo esc_html( get_theme_mod( 'contact_phone', '1-800-888-6542' ) ); ?></a></p>
        <p><strong><?php esc_html_e( 'Fax:', 'mountainlife' ); ?></strong> <?php echo esc_html( get_theme_mod( 'contact_fax', '(859) 335-0307' ) ); ?></p>
        <p><strong><?php esc_html_e( 'Email:', 'mountainlife' ); ?></strong> <a href="mailto:contact@mountainlife.com"><?php echo esc_html( get_theme_mod( 'contact_email', 'contact@mountainlife.com' ) ); ?></a></p>
      </div>
      <div class="social-links" data-aos="fade-up" data-aos-delay="300">
        <a href="<?php echo esc_url( get_theme_mod( 'linkedin_url', 'https://www.linkedin.com/company/mountain-life-insurance-company' ) ); ?>" target="_blank" rel="noopener noreferrer" class="linkedin-button">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="<?php esc_attr_e('LinkedIn', 'mountainlife'); ?>" class="linkedin-icon">
          <?php echo esc_html( get_theme_mod( 'linkedin_text', 'Connect on LinkedIn' ) ); ?>
        </a>
      </div>
    </div>
  </section>

</main>

<?php get_footer(); ?>
