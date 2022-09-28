import streamlit as st  
#from textblob import TextBlob
import pandas as pd
import altair as alt
#from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from snownlp import SnowNLP

# Fxn
def convert_to_df(sentiment):
	sentiment_dict = {'polarity':sentiment}#{'polarity':sentiment.polarity,'subjectivity':sentiment.subjectivity}
	sentiment_df = pd.DataFrame(sentiment_dict.items(),columns=['metric','value'])
    #.items() 因為polarity 資訊從dictionary來
	return sentiment_df
#define a function to analyze
def analyze_token_sentiment(docx):
	#analyzer = SentimentIntensityAnalyzer()
	pos_list = []
	neg_list = []
	neu_list = []
	for i in SnowNLP(docx).sentences:
		res = SnowNLP(i).sentiments
		if res > 0.1:
			pos_list.append(i)
			pos_list.append(res)

		elif res <= -0.1:
			neg_list.append(i)
			neg_list.append(res)
		else:
			neu_list.append(i)

	result = {'positives':pos_list,'negatives':neg_list,'neutral':neu_list}
	return result 
# def analyze_token_sentiment(docx): #SnowNLP(u'我喜欢学语言。')
# 	#analyzer = SnowNLP()#SentimentIntensityAnalyzer()
#     # SnowNLP() 裡面一定要有一個arg 不可以單獨被叫
#https://bobbyhadz.com/blog/python-typeerror-init-missing-1-required-positional-argument
# 	pos_list = []
# 	neg_list = []
# 	neu_list = []
# for i in SnowNLP(docx).sentences: #snownlp自動有斷句docx.sentences #docx.split()
#         res = SnowNLP(i).sentiments
#         #polarity_scores['compound']是SentimentIntensityAnalyzer的
#         #因為compound是他ouput的real sentiment
# if res > 0.5: #我這裡修改值 因為snownlp的model訓練出來是非負值的
# 		pos_list.append(i)
# 		pos_list.append(res)

# 	elif res <= 0.5:
# 		neg_list.append(i)
# 		neg_list.append(res)
# 	else:
# 		neu_list.append(i)

# 	result = {'positives':pos_list,'negatives':neg_list,'neutral':neu_list}
# return result 




		






def main():
	st.title("多句情緒判讀!") #Sentiment Analysis NLP App
	st.subheader("Streamlit Projects")

	menu = ["首頁","關於"]
	choice = st.sidebar.selectbox("Menu",menu)

	if choice == "首頁":
		st.subheader("首頁")
		with st.form(key='nlpForm'):
			raw_text = st.text_area("可輸入單句或多句，請以全形標點區隔：") #Enter Text Here
			submit_button = st.form_submit_button(label='判讀！💘')

		# layout
		col1,col2 = st.columns(2)
		if submit_button:

			with col1:
				st.info("通篇結果")
				sentiment = SnowNLP(raw_text).sentiments #TextBlob(raw_text).sentiment
				st.write(sentiment)
#https://ithelp.ithome.com.tw/articles/10203398
#TextBlob沒有中文
				# Emoji
				if sentiment>0.5: #.polarity > 0
					st.markdown("Sentiment::  😻 ") #Positive:smiley:
				elif sentiment<0.5: #.polarity < 0
					st.markdown("Sentiment::  😿 🫠 ") #Negative:angry:
				else:
					st.markdown("Sentiment:: 無情無意 🦥 ")#Neutral

				# Dataframe
				result_df = convert_to_df(sentiment)
				st.dataframe(result_df)

				# Visualization
				c = alt.Chart(result_df).mark_bar().encode(
					x='metric',
					y='value',
					color='metric')
                    #color is going to produce according to the metric
				st.altair_chart(c,use_container_width=True)



			with col2:
				st.info("單句分析") #Token Sentiment

				token_sentiments = analyze_token_sentiment(raw_text)
                # for i in list(SnowNLP(raw_text).tags)[0:len(list(SnowNLP(raw_text).tags))]:
                #     token_sentiments = analyze_token_sentiment(i)

				st.write(token_sentiments)






	else:
		st.subheader("About")


if __name__ == '__main__':
	main()


