import { useCollection } from 'react-firebase-hooks/firestore';
import { useState, useEffect } from 'react';
import { getCurrentAuth, getCurrentDatabase } from '@/src/FirebaseBridge/firebaseApp';
import { getData } from '@/src/FirebaseBridge/firestore/getData';
import { currentUser } from '@/src/FirebaseBridge/Auth/currentUser';
import { LoadingHook } from 'react-firebase-hooks/auth/dist/util';
import { DocumentData, QuerySnapshot, collection } from 'firebase/firestore';

export declare type MyCollectionStateHook = LoadingHook<QuerySnapshot<DocumentData, DocumentData> | null, Error>;

const useDataCollection = (path:string):MyCollectionStateHook => {
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

export default useDataCollection;
