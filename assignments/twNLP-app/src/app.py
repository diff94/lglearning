# 國立臺灣大學語言所 d08142001 王伯雅
# https://diff94-nlp-web-assignmentstwnlp-appsrcapp-jn670q.streamlitapp.com/
import streamlit as st
from views.components.spinner import dowload_ckip_package, download_cwn_drivers
import pandas as pd
# import glob
# import os
from pathlib import Path
import numpy as np
from ckip_transformers.nlp import CkipWordSegmenter
import altair as alt
from collocation import Collocation
from st_aggrid import GridOptionsBuilder, AgGrid, GridUpdateMode, DataReturnMode
#黃線以為沒裝成功但其實有!
# @st.cache
# def seg():
#     ws_driver = CkipWordSegmenter()
#     ws = ws_driver(st.session_state["input_data"], use_delim=True)
#     return ws  
@st.cache
def df_S():
    #gihub的路徑 餵給streamlit要這樣寫
    #pkg_path = Path("__file__").resolve().parent /"assignments"/"twNLP-app"/ "src"
    #local跑時要改回
    #pkg_path = Path("__file__").resolve().parent / "src"
    pkg_path = Path("__file__").resolve().parent /"assignments"/"twNLP-app"/ "src"
    PTT_path = pkg_path / "df_S.csv" 
    
    df =pd.read_csv(PTT_path)
    return df
df_S = df_S() 
@st.cache
def df_K():
    pkg_path = Path("__file__").resolve().parent /"assignments"/"twNLP-app"/ "src"
    PTT_path = pkg_path / "df_K.csv"
    df =pd.read_csv(PTT_path)
    return df
df_K = df_K() 
#透過@st.cache 就不用重複上傳df
#但df_S = df_S() 一定要寫在其他func外面
def meta(input,corpus):
         
    
    #metadf = df_S.title[df_S['title'].str.contains('|'.join(input[0]))]
    #或是個別抽成list of df 再 合併成像colloc那樣三個df
    #或是不用這麼細,綜觀看 這樣一句話 可能在哪些發文類別出現
    #tag 部分繪圖
    dfls= []
    for i in input[0]: 
    #for t in tag_Sls: 
        
    #   # Initialize
        cols = ["title","tag"]    
    #df = df_S.title[(df_S['tag'] ==t) & (df_S['seg_text'].str.contains(i)) ]
    #df = df_S.tag[(df_S['seg_text'].str.contains(i)) ]
        df = corpus.loc[corpus['seg_text'].str.contains(i, na=False), corpus.columns.isin(cols)]
        df["Target word"] = i
    # df["tag"] = t
        dfls.append(df)

    metadf = pd.concat(dfls, keys=input[0])
    return metadf
def colloc(input,L,R,df):#,df

    corpus = []
    for title in df['seg_text']:
    # for sent in ly.split("\n"):  #放入以"\n"分隔的句子
    #     if sent.strip() == "": continue
        sentence = []
        if isinstance(title, float)==True: continue
        for tk in title.split(" "):
            #if type(tk) == float: continue
            if tk == "": continue
            if isinstance(tk, float)==True: continue
            sentence.append(tk)
        corpus.append(sentence)
    #c = Collocation(corpus, left_window=1, right_window=0)
    re1 = ["(?:\s|^)"]
    re2 = ["(?:\s|$)"]
    # ws_driver = CkipWordSegmenter()
    # ws = ws_driver(input, use_delim=True)
    search = [a+str(i)+b for i in input[0] for a in re1 for b in re2]
    lef_coldfls= []
    for i in search:
        
        
    #   # Initialize
        
        c = Collocation(corpus, left_window=L, right_window=R)
        lef_coldf = pd.DataFrame(c.get_topn_collocates(i, cutoff=1, n="none", by="Gsq", chinese_only=True),columns=["Target word",'Collocation', 'freq'])
        if lef_coldf.shape[0] != 0: 
            lef_coldf = pd.concat([lef_coldf.drop(['freq'], axis=1), lef_coldf['freq'].apply(pd.Series)], axis=1)
            lef_coldfls.append(lef_coldf.sort_values(by='Gsq', ascending=True))
        
    all_left = pd.concat(lef_coldfls)
    return all_left

def PPT_counts(input,data):
    pkg_path = Path("__file__").resolve().parent /"assignments"/"twNLP-app"/ "src"
    # ws_driver = CkipWordSegmenter()
    # ws = ws_driver(input, use_delim=True)
    if data == "KPOP":
        PTT_path = pkg_path / "df_K_counts.csv" 
        df = pd.read_csv(PTT_path)
        df = df.sort_values(by='counts', ascending=False)
        searchdf = df[df['word'].isin(input[0])]
    elif data == "SoftJob":
        PTT_path = pkg_path / "df_S_counts.csv" 
        df = pd.read_csv(PTT_path)
        df = df.sort_values(by='counts', ascending=False)
        searchdf = df[df['word'].isin(input[0])]
    #else: 放keyness 功能
        
     
    return df, searchdf

def run_app(ckip_nlp_models, cwn_upgrade) -> None:
    # need to download first because CWN packages will first check whether
    # there is .cwn_graph folder in the root directory.
    download_cwn_drivers(cwn_upgrade)
    dowload_ckip_package(ckip_nlp_models)

    from views.components.sidebar import visualize_side_bar
    from views.containers import display_cwn, display_ckip, display_data_form
    
    
    st.title("LOPE")
    input_data = display_data_form()
    model, pipeline, active_visualizers = visualize_side_bar(ckip_nlp_models)
    display_factories = {"CKIP": display_ckip, "CWN": display_cwn}
    @st.cache
    def seg():
        ws_driver = CkipWordSegmenter()
        ws = ws_driver(st.session_state["input_data"], use_delim=True)
        return ws
     
#session_state let the input live ouside the rerun 
    if "input_data" in st.session_state:
        display_factories[pipeline](
            model, active_visualizers, st.session_state["input_data"])
        #st.session_state["input_data"] #是尚未斷詞input 0:"我想請問"
        #下面這種方式會一直re-run佔據記憶體
        #所以要寫在run app這個function外面
        #然後input_data下面
        # ws_driver = CkipWordSegmenter()
        # ws = ws_driver(st.session_state["input_data"], use_delim=True)
        ws = seg()
        st.snow()
        #st.subheader
        colloc_title = '<p style="font-family:Courier; color:Blue; font-size: 25px;">Collocation in PPT data</p>'
        st.markdown(colloc_title, unsafe_allow_html=True)
        st.subheader('Please set the collocation window size:')
        num= st.slider( 'Choose one size:', 0, 10, (1))
        st.subheader('Lef or right side collocation of the target word(s):')
        selectLR = st.multiselect("Select one side:", ('Left Collocation in SoftJob', 'Left Collocation in KPOP','Right Collocation in SoftJob', 'Right Collocation in KPOP'))
        if 'Left Collocation in SoftJob' in selectLR:
            st.subheader("This is Left Collocation Dataframe in SoftJob")
            collocdf= colloc(ws,num,0,df_S)
            
            gb = GridOptionsBuilder.from_dataframe(collocdf)
            gb.configure_pagination(paginationAutoPageSize=True) #Add pagination
            gb.configure_side_bar() #Add a sidebar
            gb.configure_selection('multiple', use_checkbox=True, groupSelectsChildren="Group checkbox select children") #Enable multi-row selection
            gridOptions = gb.build()

            grid_response = AgGrid(collocdf,gridOptions=gridOptions,
            data_return_mode='AS_INPUT', update_mode='MODEL_CHANGED',
            fit_columns_on_grid_load=False,
            enable_enterprise_modules=True,height=350, width='100%',reload_data=True)
            #theme='blue', #Add theme color to the table

            data = grid_response['data']
            selected = grid_response['selected_rows'] 
            df = pd.DataFrame(selected) #Pass the selected rows to a new dataframe df
            df
        if 'Left Collocation in KPOP' in selectLR:
            st.subheader("This is Left Collocation Dataframe in KPOP")
            collocdf= colloc(ws,num,0,df_K)
            
            gb = GridOptionsBuilder.from_dataframe(collocdf)
            gb.configure_pagination(paginationAutoPageSize=True) #Add pagination
            gb.configure_side_bar() #Add a sidebar
            gb.configure_selection('multiple', use_checkbox=True, groupSelectsChildren="Group checkbox select children") #Enable multi-row selection
            gridOptions = gb.build()

            grid_response = AgGrid(collocdf,gridOptions=gridOptions,
            data_return_mode='AS_INPUT', update_mode='MODEL_CHANGED',
            fit_columns_on_grid_load=False,
            enable_enterprise_modules=True,height=350, width='100%',reload_data=True)
            #theme='blue', #Add theme color to the table

            data = grid_response['data']
            selected = grid_response['selected_rows'] 
            df = pd.DataFrame(selected) #Pass the selected rows to a new dataframe df
            df
        if 'Right Collocation in SoftJob' in selectLR:
            st.subheader("This is Right Collocation Dataframe in SoftJob")
            collocdf= colloc(ws,0,num,df_S)
            
            gb = GridOptionsBuilder.from_dataframe(collocdf)
            gb.configure_pagination(paginationAutoPageSize=True) #Add pagination
            gb.configure_side_bar() #Add a sidebar
            gb.configure_selection('multiple', use_checkbox=True, groupSelectsChildren="Group checkbox select children") #Enable multi-row selection
            gridOptions = gb.build()

            grid_response = AgGrid(collocdf,gridOptions=gridOptions,
            data_return_mode='AS_INPUT', update_mode='MODEL_CHANGED',
            fit_columns_on_grid_load=False,
            enable_enterprise_modules=True,height=350, width='100%',reload_data=True)
            #theme='blue', #Add theme color to the table

            data = grid_response['data']
            selected = grid_response['selected_rows'] 
            df = pd.DataFrame(selected) #Pass the selected rows to a new dataframe df
            df
        if 'Right Collocation in KPOP' in selectLR:
            st.subheader("This is Right Collocation Dataframe in KPOP")
            collocdf= colloc(ws,0,num,df_K)
            
            gb = GridOptionsBuilder.from_dataframe(collocdf)
            gb.configure_pagination(paginationAutoPageSize=True) #Add pagination
            gb.configure_side_bar() #Add a sidebar
            gb.configure_selection('multiple', use_checkbox=True, groupSelectsChildren="Group checkbox select children") #Enable multi-row selection
            gridOptions = gb.build()

            grid_response = AgGrid(collocdf,gridOptions=gridOptions,
            data_return_mode='AS_INPUT', update_mode='MODEL_CHANGED',
            fit_columns_on_grid_load=False,
            enable_enterprise_modules=True,height=350, width='100%',reload_data=True)
            #theme='blue', #Add theme color to the table

            data = grid_response['data']
            selected = grid_response['selected_rows'] 
            df = pd.DataFrame(selected) #Pass the selected rows to a new dataframe df
            df
        # if st.button('Meta-label'):
        #     metadf = meta(ws)
        #     # collocdf,metadf = meta(ws)
        #     # AgGrid(collocdf)
        #     # st.checkbox("Use container width", value=False, key="use_container_width")
        #     # st.dataframe(collocdf, use_container_width=st.session_state.use_container_width)
        #     meta_group = metadf.groupby(["Target word", "tag"]).size().reset_index(name="Frequency")
        #     #collocdf
        #     AgGrid(metadf)
        #     AgGrid(meta_group)
        #     # metadf,meta_group
        #     st.vega_lite_chart(meta_group, {
        #         'mark': {
        #             'type': 'bar'},
        #             'encoding': {
        #                  "column": {"field": "Target word","header": {"orient": "bottom"}},
        #                  "y": {"field": "Frequency", "type": "quantitative"},
        #                  "x": {"field": "tag"},
        #                  "color": {"field": "tag"}},})
            # st.vega_lite_chart(metadf, {'mark': {'type': 'circle', 'tooltip': True},
            # 'encoding': {'x': {'field': 'a', 'type': 'quantitative'},
            # 'y': {'field': 'b', 'type': 'quantitative'},
            # 'size': {'field': 'c', 'type': 'quantitative'},
            # 'color': {'field': 'c', 'type': 'quantitative'},},})
            
        meta_title = '<p style="font-family:Courier; color:Blue; font-size: 25px;">Frequency and Related Topics in PPT data</p>'
        st.markdown(meta_title, unsafe_allow_html=True)
        st.subheader("Different Boards from PTT Corpus for data exploration!")
        selectCorpus = st.multiselect("Select one or both :", ('KPOP','SoftJob'))
        
        if 'KPOP' in selectCorpus:
            df_all,seg_df= PPT_counts(ws,'KPOP')
            column_left, column_right = st.columns(2)
            with column_left:
                st.subheader("This is the top 10 frequent word in KPOP board: ")
                st.write(alt.Chart(df_all.head(10)).mark_bar().encode(
                x=alt.X('word', sort=None),
                y='counts',))
            with column_right:
                st.subheader("This is the frequency distribution of target words in KPOP board: ")
                st.write(alt.Chart(seg_df).mark_bar().encode(
                x=alt.X('word', sort=None),
                y='counts',))
            st.subheader("Topics related to the target words in KPOP board: ")
            metadf = meta(ws,df_K)
            # collocdf,metadf = meta(ws)
            # AgGrid(collocdf)
            # st.checkbox("Use container width", value=False, key="use_container_width")
            # st.dataframe(collocdf, use_container_width=st.session_state.use_container_width)
            meta_group = metadf.groupby(["Target word", "tag"]).size().reset_index(name="Frequency")
            column_left, column_right = st.columns(2)
            with column_left:
                st.vega_lite_chart(meta_group, {
                    'mark': {
                        'type': 'bar'},
                        'encoding': {
                            "column": {"field": "Target word","header": {"orient": "bottom"}},
                            "y": {"field": "Frequency", "type": "quantitative"},
                            "x": {"field": "tag"},
                            "color": {"field": "tag"}},})
            with column_right:
                AgGrid(meta_group)
            
            #collocdf
            st.subheader("This is an interactive dataframe! You may filter the information! ")
            AgGrid(metadf)
            
            # metadf,meta_group
            
        if 'SoftJob' in selectCorpus:
            df_all,seg_df= PPT_counts(ws,'SoftJob')
            column_left, column_right = st.columns(2)
            with column_left:
                st.subheader("This is the top 10 frequent word in SoftJob board: ")
                st.write(alt.Chart(df_all.head(10)).mark_bar().encode(
                x=alt.X('word', sort=None),
                y='counts',))
            with column_right:
                st.subheader("This is the frequency distribution of target words in SoftJob board: ")
                st.write(alt.Chart(seg_df).mark_bar().encode(
                x=alt.X('word', sort=None),
                y='counts',))
            st.subheader("Topics related to the target words in SoftJob board: ")
            
            metadf = meta(ws,df_S)
            meta_group = metadf.groupby(["Target word", "tag"]).size().reset_index(name="Frequency")
            column_left, column_right = st.columns(2)
            with column_left:
                st.vega_lite_chart(meta_group, {
                    'mark': {
                        'type': 'bar'},
                        'encoding': {
                            "column": {"field": "Target word","header": {"orient": "bottom"}},
                            "y": {"field": "Frequency", "type": "quantitative"},
                            "x": {"field": "tag"},
                            "color": {"field": "tag"}},})
            with column_right:
                AgGrid(meta_group)
            
            #collocdf
            st.subheader("This is an interactive dataframe! You may filter the information! ")
            AgGrid(metadf)
            #可以再將colloc包進去?減少需要斷詞的平率
        # if st.button('PTT'):
        #     df_all,seg_df= PPT_data(st.session_state["input_data"])
        #     st.write(alt.Chart(df_all).mark_bar().encode(
        #         x=alt.X('word', sort=None),
        #         y='counts',))
        #     st.write(alt.Chart(seg_df).mark_bar().encode(
        #         x=alt.X('word', sort=None),
        #         y='counts',))
            # st.bar_chart(df_all, x="word", y= "counts")
            # st.bar_chart(seg_df, x="word", y= "counts")
            #st.line_chart(chart_data)
            # path = r'C:\Users\am\Documents\GitHub\nlp_web_am\nlp_web\assignments\twNLP-app\src\df_S_counts.csv'
            # df = pd.read_csv(path)
            # # text = [p for p in st.session_state if len(p) != 0]
            # # text
            
            # ws_driver = CkipWordSegmenter()
            # ws = ws_driver(st.session_state["input_data"], use_delim=True)
            # #ws
            # df[df['word'].isin(ws[0])]
            #df[df['word'].isin(list(st.session_state["input_data"][0:1]))]
        #     #因為是list 所以感覺 [0]就可以讀到第一個字
        #     #這樣才可以讀到user輸入的input
        #讓user上傳檔案:
        # spectra = st.file_uploader("upload file", type={"csv", "txt"})
        # if spectra is not None:
        #     spectra_df = pd.read_csv(spectra)
        # st.write(spectra_df)
    # if st.button('PTT'):
    #     # st.write('表格')
    #     path = r'C:\Users\am\Documents\GitHub\nlp_web_am\nlp_web\assignments\ptt-crawler\data\KoreanPop\2022' # use your path
    # # Get the files from the path provided in the OP
    #     files = Path(path).glob('*.csv')  # .rglob to get subdirectories
    #     dfs = list()
    #     for f in files:
    #         data = pd.read_csv(f)
    #     # .stem is method for pathlib objects to get the filename w/o the extension
    #         data['file'] = f.stem
    #         dfs.append(data)

    #     df = pd.concat(dfs, ignore_index=True)
    #     df
    # else:
    #     st.write('Goodbye')


if __name__ == "__main__":
    ckip_nlp_models = ["bert-base", "albert-tiny", "bert-tiny", "albert-base"]
    run_app(ckip_nlp_models, cwn_upgrade=False)
