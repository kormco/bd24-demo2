const LinkList = () => {

    return (
        <section className="mt-40 container w-full justify-between items-center mx-auto">


            <ul className="w-80 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"><a href='scoreboard'>Baseball Scoreboard (Streaming Event)</a></li>
                <li className="w-full px-4 py-2 rounded-b-lg"><a href='accounts'>Account Selector (REST API)</a></li>
            </ul>

        </section>
    );
};

export default LinkList;