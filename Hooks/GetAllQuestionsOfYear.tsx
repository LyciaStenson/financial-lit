import { useCollection } from 'react-firebase-hooks/firestore';
import { getCurrentDatabase } from '@/src/FirebaseBridge/firebaseApp';
import { LoadingHook } from 'react-firebase-hooks/auth/dist/util';
import { DocumentData, QuerySnapshot, collection } from 'firebase/firestore';

export declare type MyCollectionStateHook = LoadingHook<QuerySnapshot<DocumentData, DocumentData> | null, Error>;

const useDataYearCollection = (path:string):MyCollectionStateHook => {
    const [value, loading, error] = useCollection(
        collection(getCurrentDatabase(), path),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    
    if(error){
      console.log("Error" + error.message);
    }

    return [value, loading, error];
};

export default useDataYearCollection;
