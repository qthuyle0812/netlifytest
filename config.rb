###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page '/*.html', layout: 'app'

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }


###
# General configuration
###

config[:css_dir] = 'styles'

# Sprockets
activate :sprockets
sprockets.append_path File.join(root, 'node_modules')

# Pretty URLs
activate :directory_indexes

# i18n
activate :i18n, templates_dir: 'content', mount_at_root: :de


##
# Development-specific configuration
##

configure :development do
  # Set up environment vars
  env_file = File.join(root, 'local_env.yml')
  YAML.load(File.open(env_file)).each do |key, value|
    ENV[key.to_s] = value
  end if File.exists?(env_file)

  # Reload the browser automatically whenever files change
  activate :livereload
end


##
# Staging-specific configuration
##

configure :staging do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  after_build do |builder|
    # Rename Netlify redirects file
    puts "----- RENAMING redirects to _redirects\n"
    system("mv build/redirects build/_redirects")
    puts "----- DONE\n"

    # Activate robots.txt for staging
    puts "----- RENAMING staging.robots.txt to robots.txt\n"
    system("mv build/staging.robots.txt build/robots.txt")
    puts "----- REMOVING production.robots.txt\n"
    system("rm build/production.robots.txt")
    puts "----- DONE\n"
  end
end


##
# Production-specific configuration
##
configure :production do
  # Uniquely-named assets for better cacheabilty
  activate :asset_hash, ignore: %r{fb.jpg}

  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Minify HTML
  activate :minify_html do |html|
    html.remove_multi_spaces        = true   # Remove multiple spaces
    html.remove_comments            = true   # Remove comments
    html.remove_intertag_spaces     = false  # Remove inter-tag spaces
    html.remove_quotes              = true   # Remove quotes
    html.simple_doctype             = false  # Use simple doctype
    html.remove_script_attributes   = true   # Remove script attributes
    html.remove_style_attributes    = true   # Remove style attributes
    html.remove_link_attributes     = true   # Remove link attributes
    html.remove_form_attributes     = false  # Remove form attributes
    html.remove_input_attributes    = false  # Remove input attributes
    html.remove_javascript_protocol = true   # Remove JS protocol
    html.remove_http_protocol       = false  # Remove HTTP protocol
    html.remove_https_protocol      = false  # Remove HTTPS protocol
    html.preserve_line_breaks       = false  # Preserve line breaks
    html.simple_boolean_attributes  = true   # Use simple boolean attributes
    html.preserve_patterns          = nil    # Patterns to preserve
  end

  # Produce gzipped versions as well
  activate :gzip

  after_build do |builder|
    # Rename Netlify redirects file
    puts "----- RENAMING redirects to _redirects\n"
    system("mv build/redirects build/_redirects")
    puts "----- DONE\n"

    # Activate robots.txt for production
    puts "----- RENAMING production.robots.txt to robots.txt\n"
    system("mv build/production.robots.txt build/robots.txt")
    puts "----- REMOVING staging.robots.txt\n"
    system("rm build/staging.robots.txt")
    puts "----- DONE\n"
  end
end


###
# Helpers
###

require "lib/mailto_helper"
helpers MailtoHelper

# Methods defined in the helpers block are available in templates
helpers do

=begin
  Checks if the given path is the active page.
=end
  def is_active(path)
    current_page.path == path[1..-1] ? true : false
  end

=begin
  Assembles the page title
=end
  def title
    title = current_page.data.title
    title ? title << " | Gojigarten" : default_title
  end

=begin
  Returns the page meta description
=end
  def meta_description
    description = current_page.data.meta_description
    description ? description : ""
  end

=begin
  Returns a default page title
=end
  def default_title
    "Frische Bio-Gojibeeren | Gojigarten"
  end

=begin
  Adds classes to .content
=end
  def content_class
    klass = current_page.data.content_class
    klass ? ' ' << klass : ''
  end

=begin
  Adds classes to .footer
=end
  def footer_class
    klass = current_page.data.footer_class
    klass ? ' ' << klass : ''
  end

end
