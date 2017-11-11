# This file is used for testing the atom integration.
# Feel free to ignore it.
require 'csv'

class Foo

  def bar
    puts "bar"
  end

  def baz
    this.bar
    this.ba
  end
end

class Bar

  def bing
    Foo.new.b

  end

end
