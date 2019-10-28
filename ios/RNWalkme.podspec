
Pod::Spec.new do |s|
  s.name         = "RNWalkMe"
  s.version      = "1.1.1"
  s.summary      = "RNWalkMe"
  s.description  = <<-DESC
                  React native wrapper around the ABBI / Walkme SDK.
                   DESC
  s.homepage     = "http://www.homeis.com"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "ady@homeis.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/homeisapp/react-native-walkme.git", :tag => "development" }
  s.source_files  = "RNWalkme/**/*.{h,m}"
  s.requires_arc = true
  s.dependency 'React'
  s.dependency 'abbi'

end

