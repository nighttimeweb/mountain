<?php
// functions.php

// Enqueue styles and scripts
function mountainlife_enqueue_scripts() {
    // Enqueue main stylesheet (style.css in theme root)
    wp_enqueue_style('mountainlife-style', get_stylesheet_uri());

    // Enqueue custom JavaScript file (script.js in theme root)
    wp_enqueue_script('mountainlife-script', get_template_directory_uri() . '/script.js', array('jquery'), '1.0', true);

    // Enqueue AOS animation library CSS and JS from CDN
    wp_enqueue_style('aos-css', 'https://unpkg.com/aos@2.3.1/dist/aos.css', array(), '2.3.1');
    wp_enqueue_script('aos-js', 'https://unpkg.com/aos@2.3.1/dist/aos.js', array(), '2.3.1', true);
}
add_action('wp_enqueue_scripts', 'mountainlife_enqueue_scripts');

// Register navigation menu location
function mountainlife_register_menus() {
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'mountainlife'),
    ));
}
add_action('after_setup_theme', 'mountainlife_register_menus');

// Add theme supports
function mountainlife_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 300,
        'flex-height' => true,
        'flex-width'  => true,
    ));
}
add_action('after_setup_theme', 'mountainlife_theme_setup');

// Create default menu programmatically on theme activation
function mountainlife_create_default_menu() {
    if (!wp_get_nav_menu_object('Primary Menu')) {
        $menu_id = wp_create_nav_menu('Primary Menu');

        // Top-level menu items
        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => __('Home'),
            'menu-item-url' => home_url('/'),
            'menu-item-status' => 'publish',
        ));

        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => __('About Us'),
            'menu-item-url' => home_url('/#about'),
            'menu-item-status' => 'publish',
        ));

        // Parent: Annuities
        $parent_annuities = wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => __('Annuities'),
            'menu-item-url' => home_url('/#annuities'),
            'menu-item-status' => 'publish',
        ));

        // Children of Annuities
        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => __('Annuities'),
            'menu-item-url' => home_url('/#annuities'),
            'menu-item-parent-id' => $parent_annuities,
            'menu-item-status' => 'publish',
        ));
        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => __('Annuity Calculator'),
            'menu-item-url' => home_url('/annuity-calculator'),
            'menu-item-parent-id' => $parent_annuities,
            'menu-item-status' => 'publish',
        ));

        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => __('Contact Us'),
            'menu-item-url' => home_url('/#contact'),
            'menu-item-status' => 'publish',
        ));

        // Parent: Agent Resources
        $parent_agent_resources = wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => __('Agent Resources'),
            'menu-item-url' => '#',
            'menu-item-status' => 'publish',
        ));

        // Children of Agent Resources
        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => __('Agent Portal'),
            'menu-item-url' => home_url('/agent-portal'),
            'menu-item-parent-id' => $parent_agent_resources,
            'menu-item-status' => 'publish',
        ));
        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => __('Agent Appointment'),
            'menu-item-url' => home_url('/agent-appointment'),
            'menu-item-parent-id' => $parent_agent_resources,
            'menu-item-status' => 'publish',
        ));

        // Assign menu to primary location
        $locations = get_theme_mod('nav_menu_locations');
        $locations['primary'] = $menu_id;
        set_theme_mod('nav_menu_locations', $locations);
    }
}
add_action('after_switch_theme', 'mountainlife_create_default_menu');
