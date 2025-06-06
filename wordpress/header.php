<?php
// header.php
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title><?php
    if (is_front_page()) {
      bloginfo('name'); echo ' - '; bloginfo('description');
    } else {
      wp_title('');
    }
  ?></title>

  <meta name="description" content="<?php echo esc_attr(get_bloginfo('description')); ?>">

  <link rel="canonical" href="<?php echo esc_url(home_url('/')); ?>">

  <!-- Favicon links -->
  <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="48x48" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-48x48.png">
  <link rel="icon" type="image/png" sizes="64x64" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-64x64.png">
  <link rel="icon" type="image/png" sizes="96x96" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="128x128" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-128x128.png">
  <link rel="icon" type="image/png" sizes="256x256" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-256x256.png">
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-180x180.png">
  <link rel="icon" type="image/png" sizes="192x192" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-192x192.png">
  <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon.ico" type="image/x-icon">

  <meta name="msapplication-TileColor" content="#1A4D2E">
  <meta name="theme-color" content="#1A4D2E">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- AOS CSS -->
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">

  <!-- Main stylesheet -->
  <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>">

  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<!-- Preloader -->
<div class="preloader">
  <div class="preloader-logo-block">
    <img src="<?php echo get_template_directory_uri(); ?>/images/Mountain_Life_Logo.png" alt="Mountain Life Logo">
    <div class="loading-bar">
      <div class="progress-fill"></div>
    </div>
  </div>
</div>

<header class="site-header">
  <div class="container">
    <div class="logo" data-aos="fade-down">
      <a href="<?php echo esc_url(home_url('/')); ?>">Mountain Life</a>
    </div>

    <button class="nav-toggle" aria-label="Toggle navigation">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <nav class="main-nav" data-aos="fade-down" data-aos-delay="100">
      <?php
      wp_nav_menu(array(
        'theme_location' => 'primary',
        'container' => false,
        'menu_class' => '',
        'fallback_cb' => false,
        'depth' => 2,
      ));
      ?>
    </nav>
  </div>
</header>
