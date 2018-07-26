top_tags_arr = []
@tags.each do |tag|
  top_tags_arr << tag
end

json.toptags top_tags_arr
