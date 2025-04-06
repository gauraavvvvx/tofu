import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
} from 'react-native'
import { Card, FAB, Button } from 'react-native-paper'
import { Storage } from 'expo-sqlite/kv-store'
import { useRouter } from 'expo-router'

function HomePage() {
    const router = useRouter()
    const [reload, setReload] = React.useState(false)
    const [savings, setSavings] = React.useState(Storage.getItemSync('savings'))
    const [balance, setBalance] = useState(
        Storage.getItemSync('accountBalance')
    )

    useEffect(() => {
        setSavings(Storage.getItemSync('savings'))
        setBalance(Storage.getItemSync('accountBalance'))
        console.log('Account Balance:', balance)
        console.log('Savings:', savings)
    }, [reload])

    const articles = [
        {
            title: 'Why Financial Literacy Is Important And How You Can Improve Yours',
            description:
                'Learn the basics of financial literacy and strategies to improve your money management skills.',
            url: 'https://www.forbes.com/sites/truetamplin/2023/09/21/financial-literacy--meaning-components-benefits--strategies/',
        },
        {
            title: 'Best Personal Finance Books to Read in 2025',
            description:
                'Explore top-rated books to improve your financial knowledge and build wealth.',
            url: 'https://www.businessinsider.com/personal-finance/banking/best-personal-finance-books',
        },
        {
            title: 'Financial Education Resources & Advice',
            description:
                'Access free resources on budgeting, saving, retirement planning, and more.',
            url: 'https://about.bankofamerica.com/en/making-an-impact/financial-education-resources-advice',
        },
        {
            title: 'The Ultimate Guide to Financial Literacy for Adults',
            description:
                'A comprehensive guide covering budgeting, saving, investing, and debt management.',
            url: 'https://www.investopedia.com/guide-to-financial-literacy-4800530',
        },
        {
            title: 'Money Matters: Your Guide to Financial Literacy',
            description:
                'Understand the role of money in your life and learn strategies for financial inclusion.',
            url: 'https://www.weforum.org/stories/2024/05/financial-literacy-education-money-matters/',
        },
    ]

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Savings Card */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.cardTitle}>Your Savings</Text>
                        <Text style={styles.cardValue}>₹{savings || 0}</Text>
                    </Card.Content>
                </Card>

                {/* Balance Card */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.cardTitle}>Your Balance</Text>
                        <Text style={styles.cardValue}>₹{balance || 0}</Text>
                    </Card.Content>
                </Card>

                {/* Pay Button */}
                <Button
                    mode="contained"
                    onPress={() => {
                        router.push('/payments/scanner')
                    }}
                    style={styles.payButton}
                    labelStyle={styles.payButtonLabel}
                >
                    Pay
                </Button>

                {/* Financial Education Section */}
                <Text style={styles.sectionTitle}>
                    Learn Financial Education
                </Text>
                {articles.map((article, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => Linking.openURL(article.url)}
                        style={styles.articleCard}
                    >
                        <Text style={styles.articleTitle}>{article.title}</Text>
                        <Text style={styles.articleDescription}>
                            {article.description}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Floating Action Button for Reload */}
            <FAB
                icon="reload"
                onPress={() => setReload(!reload)}
                style={styles.fab}
                color="#FFFFFF"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050F10',
    },
    scrollContent: {
        padding: 16,
    },
    card: {
        backgroundColor: '#28272B',
        borderRadius: 8,
        marginBottom: 24,
        padding: 16,
    },
    cardTitle: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 8,
    },
    cardValue: {
        fontSize: 24,
        color: '#1DB954', // Green color for emphasis
        fontWeight: 'bold',
    },
    payButton: {
        backgroundColor: '#1DB954',
        borderRadius: 24,
        marginVertical: 32,
    },
    payButtonLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 12,
    },
    articleCard: {
        backgroundColor: '#28272B',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 24,
    },
    articleTitle: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    articleDescription: {
        fontSize: 14,
        color: '#B0B0B0',
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#28272B',
    },
})

export default HomePage
