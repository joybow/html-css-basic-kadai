# restaurants_searcher.rb
require 'net/http'
require 'json'
require 'csv'

KEYID = "9ade1000e92067ee"
COUNT = 100
PREF = ""
FREEWORD = "名古屋市昭和区"
FORMAT = "json"
PARAMS = {"key": KEYID, "count":COUNT, "large_area":PREF, "keyword":FREEWORD, "format":FORMAT}

def write_data_to_csv(params)
  restaurants = [["名称", "営業日", "住所", "アクセス"]] 
  uri = URI.parse("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/")
  uri.query = URI.encode_www_form(params)
  json_res = Net::HTTP.get uri
  # JSON.load(response)
  response = JSON.load(json_res)
  
  if response == nil or response["results"].has_key?("error") then
    puts "エラーが発生しました！"
  end
  for restaurant in response["results"]["shop"] do
    rest_info = [restaurant["name"], restaurant["open"], restaurant["address"], restaurant["access"]]
    puts rest_info
    restaurants.append(rest_info)
  end
  
  CSV.open("restaurants_list.csv", "w") do |csv|
    restaurants.each do |rest_info|
      csv << rest_info
    end
  end
  return puts restaurants
end

write_data_to_csv(PARAMS)