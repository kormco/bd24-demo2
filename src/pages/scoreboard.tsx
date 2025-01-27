import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../common/components/layout/Layout';
import BaseballScoreboard from '../common/components/BaseballScoreboard';
import { getSession, useSession } from 'next-auth/react';
import { CtxOrReq } from 'next-auth/client/_utils'; 
import { useCallback, useEffect, useState } from 'react';

const Home: NextPage = () => {
    const { data: sessionData } = useSession();
    const [homeScore,setHomeScore] = useState(0);
    const [awayScore,setAwayScore] = useState(0);
    const [outs, setOuts] = useState(0);
    const [inning, setInning] = useState(0);
    const [balls, setBalls] = useState(0);
    const [strikes, setStrikes] = useState(0);
    const [sseConnection, setSSEConnection] = useState<EventSource | null>(null);
    const listenToSSEUpdates = useCallback(() => {
        console.log('listenToSSEUpdates func');
        const eventSource = new EventSource('/api/scoreboard');
        eventSource.onopen = () => {
          console.log('SSE connection opened.');
          
        };
        eventSource.onmessage = (event) => {
          if (event.data) {
              //console.info('Received SSE Update:', event.data);
              const payload = JSON.parse(event.data).payload;
              console.error('New play found, updating score..');
              setHomeScore(payload.Home_Score__c);
              setAwayScore(payload.Away_Score__c);
              setOuts(payload.Out_Count__c);
              setInning(payload.Inning__c);
              setBalls(payload.Ball_Count__c);
              setStrikes(payload.Strike_Count__c);
          }
        };
        eventSource.onerror = (event) => {
          console.error('SSE Error:', event);
          // Handle the SSE error here
        };

        setSSEConnection(eventSource);
        
        return eventSource;
      }, []);
      const close = useEffect(() => { 
        listenToSSEUpdates(); 
        return () => {
            if (sseConnection) {
              sseConnection.close();
            }
          };
      }, [listenToSSEUpdates]);  
      useEffect(() => {
        const handleBeforeUnload = () => {
          console.dir(sseConnection);
          if (sseConnection) {
            console.info('Closing SSE connection before unloading the page.');
            sseConnection.close();
          }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        // Clean up the event listener when the component is unmounted
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, [sseConnection]);
    return (
        <>
            <Head>
                <title>Salesforce JS Demo</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <BaseballScoreboard 
                    homeScore={homeScore}
                    awayScore={awayScore}
                    inning={inning}
                    outs={outs}
                    balls={balls}
                    strikes={strikes}
                />
            </Layout>
        </>
    );
};

export const getServerSideProps = async (ctx: CtxOrReq | undefined) => {
    const session = await getSession(ctx);
    /**
     * If session is available then redirect to main page.
     */
    if (!session) {
        return {
            redirect: { destination: '/signin', permanent: false },
        };
    }

    /**
     * Return providers and CSRF Token
     */
    return {
        props: { session },
    };
};

export default Home;
