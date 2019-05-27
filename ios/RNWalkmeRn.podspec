
Pod::Spec.new do |s|
  s.name         = "RNWalkmeRn"
  s.version      = "1.0.0"
  s.summary      = "RNWalkmeRn"
  s.description  = <<-DESC
                  RNWalkmeRn
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNWalkmeRn.git", :tag => "master" }
  s.source_files  = "RNWalkmeRn/**/*.{h,m}"
  s.requires_arc = true
  s.dependency 'React'
  s.dependency 'abbi'

end

  