import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, TextInput, Text } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import LIST_BY_GENRES from '../../apis/list_by_genres';
import Item from '../../components/Item';
import Loading from '../../components/Loading';
import { MaterialCommunityIcons } from '@expo/vector-icons';




export default function ListByGenres({ route, navigation }) {
    const [listManga, setListManga] = useState([]);
    const [loading, setloading] = useState(1);
    // const [filter, setfilter] = useState(sortby[0]);
    // const sortby = [
    //     {
    //         sort: 0,
    //         name: "Ngày cập nhật"
    //     },
    //     {
    //         sort: -15,
    //         name: "Truyện mới"
    //     },
    //     {
    //         sort: 10,
    //         name: "Top all"
    //     },
    //     {
    //         sort: 11,
    //         name: "Top tháng"
    //     },
    //     {
    //         sort: 12,
    //         name: "Top tuần"
    //     },
    //     {
    //         sort: 13,
    //         name: "Top ngày"
    //     },
    //     {
    //         sort: 20,
    //         name: "Theo dõi"
    //     }
    // ];
    // const[] = route.params;
    const [currentPage, setCurrentPage] = useState(1);
    const [url, seturl] = useState(route.params.url);
    const getNew = () => {
        setloading(1);
        setCurrentPage(1);
        LIST_BY_GENRES(url+'&page='+currentPage).then(res => {
            setListManga(res);
            setloading(0);
        });
        // console.log(1);
    }
    const loadMore = () => {
        setCurrentPage(currentPage+1);
        LIST_BY_GENRES(url+'&page='+currentPage).then(res => {
            setListManga([...listManga, ...res]);
        });
        console.log(currentPage);
    }
    useEffect(() => {
        getNew();
    }, [url]);
    return (
        <View>
        { loading === 1  && (
            <View style={styles.loading}>
                <Loading />
            </View>
        ) }
            {
                listManga.length != 0 && (
                    <View style={styles.input_container}>
                        <MaterialCommunityIcons name="magnify" color="#333" size={24} />
                        <TextInput 
                        style={styles.input}
                        placeholder='Tìm kiếm'
                        onChangeText={data => {
                            let newUrl = url;
                            if(newUrl.includes('&keyword=')){
                                newUrl = newUrl.replace('&keyword='+newUrl.split('&keyword=')[1], '&keyword='+data);
                            }else{
                                newUrl += '&keyword='+data;
                            }
                            setListManga([]);
                            seturl(newUrl);
                        }}
                        >
                        </TextInput>
                    </View>
                )
            }
            <FlatList
                data={listManga}
                renderItem={({item}) => 
                    <Item item={item}
                    navigation={navigation}
                    />
                }
                numColumns={2}
                keyExtractor={(e,i) => i.toString()}
                initialNumToRender={10}
                onEndReachedThreshold={0.7}
                ListFooterComponent={<View style={{ height: 100, flex: 1, alignItems: 'center' }}></View>}
                onEndReached={() => loadMore()}
            >
            </FlatList>
        </View>
    );

    
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignContent:'center',
        marginTop: vh(45)
    },
    container: {
        flex:1,
        alignItems: 'center'
    },
    input_container: {
        padding: 12,
        width: vw(95),
        height: 44,
        backgroundColor: '#ccc',
        borderRadius: 8,
        marginRight: 12,
        marginLeft: 12,
        marginTop: 12,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '100%',
        color: '#000',
        height: 44,
        padding: 4
    },
 });