import React, { useEffect, useState } from 'react';
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
import { View } from 'react-native';
import styles from "./styles";
import Connection from '../../components/ui/icons/Connection';
import DesignedText from '../../components/ui/DesignedText';

type SearchScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Search'>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

function SearchScreen({ navigation }: SearchScreenProps) {
  const [searchPrompt, setSearchPrompt] = useState("");
  const mainService = new MainService();
  const authContext = useAuth();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [users, setUsers] = useState<UserFields[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchPrompt !== "") {
        mainService.search(searchPrompt, authContext).then(result => {
          setWishes(result.wishes);
          setUsers(result.users);
        });
      }
      else {
        setWishes([]);
        setUsers([]);
      }
    }, 500)

    return () => clearTimeout(timeout);
  }, [searchPrompt]);

  const renderItem = ({ item, i }: {item: unknown, i: number}) => (
    <WishCard wish={item as Wish} key={i}/>
  );

  return (
    <ScreenContainer>
        <SearchInput 
          placeholder={"Знайди друзів, бажання та бренди"}
          value={searchPrompt}
          error={undefined}
          onChange={(text) => {setSearchPrompt(text)}}
        />
        {(wishes.length !== 0 || users.length !== 0) ?
          <ScrollView>
            <View style={styles.usersContainer}>
              {users.map((user, indx) =>
               <UserCard key={indx} user={user} size={"small"}/>
              )}
            </View>
            <MasonryList
              data={wishes}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
            />
          </ScrollView>
          :
          <View style={styles.addFriendsButton}>
            <View style={styles.smallButton}>
              <Connection />
            </View>
            <View><DesignedText size="small">додати друзів</DesignedText></View>
          </View>
        }
    </ScreenContainer>
  );
};

export default SearchScreen;
