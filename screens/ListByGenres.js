import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import LIST_BY_GENRES from '../apis/list_by_genres';
import Item from '../components/Item';
import Loading from '../components/Loading';
import { Animations } from '../constants/Animation';

export default function ListByGenres({ route, navigation }) {
    const [listManga, setListManga] = useState([]);
    const [loading, setloading] = useState(1);
    // const [filter, setfilter] = useState(sortby[0]);
    const sortby = [
        {
            sort: 0,
            name: "Ngày cập nhật"
        },
        {
            sort: -15,
            name: "Truyện mới"
        },
        {
            sort: 10,
            name: "Top all"
        },
        {
            sort: 11,
            name: "Top tháng"
        },
        {
            sort: 12,
            name: "Top tuần"
        },
        {
            sort: 13,
            name: "Top ngày"
        },
        {
            sort: 20,
            name: "Theo dõi"
        }
    ];
    // const[] = route.params;
    const [currentPage, setCurrentPage] = useState(1);
    const [url, seturl] = useState(route.params.url);
    const getNew = () => {
        setloading(1);
        // setCurrentPage(1);
        LIST_BY_GENRES(url+'&page='+currentPage).then(res => {
            setListManga([...listManga, ...res]);
            setloading(0);
        });
        console.log(1);
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
            <TextInput 
            style={styles.input}
            placeholder='search'
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
                // onEndReached={() => getNew()}
            >
            </FlatList>
        </View>
    );

    
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignContent:'center'
    },
    container: {
        flex:1,
        alignItems: 'center'
    },
    input: {
        flex: 1,
        padding: 12,
        width: vw(100),
        height: 32,
        backgroundColor: '#fff',
        borderRadius: 8
    }
 });