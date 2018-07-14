# https://gist.github.com/renatocarvalho/afda8238f57f57b94ae5

# ====================================
#   Obfuscate email
#   Adapted from:
#   http://stackoverflow.com/questions/483212/effective-method-to-hide-email-from-spam-bots2
#   Usage:
#   = mailto('hi@email.com', 'Get in touch', 'btn btn--nav')
# ====================================

module MailtoHelper
  MAIL_TO = 'mailto:'
  AT = '@'
  DOT = '.'

  def mailto(
    email: nil,
    string: "contact me",
    classes: ''
  )

    unless email
      puts 'Wrong parameters! Email adress missing.'
      return false
    end

    comp = email.split('@')

    # process string, if it is an email address
    if string.include?('@') then
      string.gsub!('@', AT + '&zwnj;').gsub!('.', DOT)
    end

    return "<a class=\"#{classes}\" href='javascript:;' rel='nofollow' onclick='str1=\"#{comp[0]}\";str2=\"#{comp[1]}\";this.href=\"#{MAIL_TO}\" + str1 + \"@\" + str2'>#{string}</a>"
  end
end
