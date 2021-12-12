import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native';
import LATEST_UPDATE from '../apis/latest_update_list';
import Item from '../components/Item';
import Loading from '../components/Loading';


export default function HomePage({ navigation }) {
    const [listManga, setListManga] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const getNew = () => {
        setCurrentPage(currentPage+1);
        LATEST_UPDATE(currentPage).then(res => setListManga([...listManga, ...res]));
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