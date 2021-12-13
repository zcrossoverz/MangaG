import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native';
import LIST_BY_GENRES from '../apis/list_by_genres';
import Item from '../components/Item';
import Loading from '../components/Loading';


export default function ListByGenres({ route, navigation }) {
    const [listManga, setListManga] = useState([]);
    const { url } = route.params;
    const getNew = () => {
        LIST_BY_GENRES(url).then(res => setListManga(res));
    }
    useEffect(() => {
        getNew();
    }, []);
    return (
        <View>
        { listManga.length === 0  && (
            <View style={styles.loading}>
                <Loading />
            </View>
        ) }
            <FlatList
                data={listManga}
                renderItem={({item}) => 
                    <Item item={item}
                    navigation={navigation}/>
                }
                numColumns={2}
                keyExtractor={(e,i) => i.toString()}
                initialNumToRender={10}
                onEndReachedThreshold={100}
                onEndReached={() => getNew()}
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
    }
 });