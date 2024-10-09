import React, { useCallback, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { MainStackParamList } from '../../components/navigationStacks/MainStackScreen';
import SearchInput from '../../components/ui/inputs/SearchInput';
import { MainService } from './services';
import { useAuth } from '../../contexts/AuthContext';
import { Wish } from '../wishCreating/interfaces';
import { UserFields } from '../auth/interfaces';
import { ScrollView } from 'react-native-gesture-handler';
import UserCard from '../../components/Main/UserCard';
import MasonryList from '@react-native-seoul/masonry-list';
import WishCard from '../../components/Main/WishCard';
import { NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity, View } from 'react-native';
import styles from "./styles";
import Connection from '../../components/ui/icons/Connection';
import DesignedText from '../../components/ui/DesignedText';
import { Brand, Request } from './interfaces';
import BigBrandCard from '../../components/Main/BigBrandCard';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../components/ui/Loader';
import RequestCard from '../../components/Main/RequestCard';
import { useLocalization } from '../../contexts/LocalizationContext';

type SearchScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Search'>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

function SearchScreen({ navigation }: SearchScreenProps) {
  const { staticData } = useLocalization();
  const [searchPrompt, setSearchPrompt] = useState("");
  const mainService = new MainService();
  const authContext = useAuth();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [users, setUsers] = useState<UserFields[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [query, setQuery] = useState({
    "users": false,
    "brands": false,
    "wishes": false
  })
  const [popularRequests, setPopularRequests] = useState<Request[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [nextUrl, setNextUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;

    const isCloseToBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y < 1000;

    if (isCloseToBottom && !isFetching && nextUrl !== "") {
      setIsFetching(true);
      mainService.searchWithPagination(query, searchPrompt, authContext, nextUrl).then(result => {
        setWishes(prevWishes => [...prevWishes, ...result.results.wishes || []]);
        setBrands(prevBrands => [...prevBrands, ...result.results.brands || []]);
        setUsers(prevUsers => [...prevUsers, ...result.results.users || []]);
        setNextUrl(result.next || "");
      }
    ).finally(() => {
        setIsFetching(false);
      });
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      if (searchPrompt !== "") {
        let resultType = null;
        if (query.brands && !query.users && !query.wishes) {
          resultType = "brands";
        }
        else if (!query.brands && query.users && !query.wishes) {
          resultType = "users";
        }
        else if (!query.brands && !query.users && query.wishes) {
          resultType = "wishes";
        }

        if (resultType) {
          mainService.getRequests(searchPrompt, authContext).then(requests => {
            setRequests(requests);
          });
          mainService.searchWithPagination(query, searchPrompt, authContext).then(result => {
            if (result.count > 0) {
              setNextUrl(result.next || "");
              setWishes(result.results.wishes || []);
              setBrands(result.results.brands || []);
              setUsers(result.results.users || []);
            }
            setLoading(false);
          });
        }
        else {
          mainService.getRequests(searchPrompt, authContext).then(requests => {
            setRequests(requests);
          });
          mainService.search(query, searchPrompt, authContext).then(result => {
            setWishes(result.wishes || []);
            setUsers(result.users || []);
            setBrands(result.brands || []);
            setNextUrl("");
            setLoading(false);
          });
        }
      }
      else {
        setWishes([]);
        setUsers([]);
        setBrands([]);
        setNextUrl("");
        setLoading(false);
      }
    }, 500)

    return () => clearTimeout(timeout);
  }, [searchPrompt, query]);

  const renderItem = ({ item, i }: {item: unknown, i: number}) => (
    <WishCard wish={item as Wish} key={i}/>
  );

  useFocusEffect(
    useCallback(() => {
      mainService.getRequests("", authContext).then(requests => {
        setPopularRequests(requests);
      });
    }, [])
  );

  return (
    <ScreenContainer>
        {loading && <Loader />}
        <SearchInput 
          placeholder={staticData.main.searchScreen.searchPlaceholder}
          value={searchPrompt}
          error={undefined}
          onChange={(text) => {setSearchPrompt(text)}}
        />
        {searchPrompt !== "" ? 
          (wishes.length !== 0 || users.length !== 0 || brands.length !== 0) ?
            <>
              <ScrollView style={{maxHeight: 50, height: 50}} contentContainerStyle={styles.categoriesContainer} horizontal>
                {staticData.main.searchScreen.categories.map((category: {key: string, name: string}) => (
                  <TouchableOpacity key={category.key} onPress={() => { setQuery({...query, [category.key]: !query[category.key as keyof typeof query]}); }}> 
                    <View style={query[category.key as keyof typeof query] ? styles.selectedCategory : styles.category}>
                      <DesignedText size={"small"} style={query[category.key as keyof typeof query] && {color: "#B70000"}}>{category.name}</DesignedText>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView contentContainerStyle={styles.searchResultContainer} onScroll={handleScroll}>
                <View style={[styles.usersContainer, {gap: 8}]}>
                  {requests.map((request, indx) => (
                    <RequestCard key={indx} searchPrompt={searchPrompt} request={request.query} onPress={() => {setSearchPrompt(request.query)}}/>
                  ))}
                </View>
                <View style={styles.usersContainer}>
                  {users.map((user, indx) =>
                   <UserCard key={indx} user={user} size={"small"}/>
                  )}
                </View>
                <View style={styles.usersContainer}>
                  {brands.map((brand, indx) =>
                   <BigBrandCard key={indx} brand={brand} />
                  )}
                </View>
                <MasonryList
                  data={wishes}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  containerStyle={{paddingTop: 16}}
                />
              </ScrollView>
            </>
            :
            <>
              <View style={[styles.usersContainer, {gap: 8, marginBottom: 16}]}>
                {requests.map((request, indx) => (
                  <RequestCard key={indx} searchPrompt={searchPrompt} request={request.query} onPress={() => { setSearchPrompt(request.query) }}/>
                ))}
              </View>
              {!loading && <DesignedText size="small" style={{ alignSelf: "center" }}>{staticData.main.searchScreen.emptyMessage}</DesignedText>}
            </>
          :
          <>
            <DesignedText>{staticData.main.searchScreen.popularRequests}</DesignedText>
            <View style={styles.popularRequestsContainer}>
              {popularRequests.map((request, indx) => (
                <TouchableOpacity key={indx} onPress={() => {setSearchPrompt(request.query)}}>
                  <View style={styles.popularRequest}>
                    <DesignedText size="small" isUppercase={false}>{request.query}</DesignedText>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.addFriendsButton}>
              <View style={styles.smallButton}>
                <Connection />
              </View>
              <View><DesignedText size="small">{staticData.main.searchScreen.addFriendsButton}</DesignedText></View>
            </View>
          </>
        }
    </ScreenContainer>
  );
};

export default SearchScreen;
