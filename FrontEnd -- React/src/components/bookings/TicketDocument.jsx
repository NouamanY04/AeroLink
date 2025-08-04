import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#2563eb',
    },
    section: {
        margin: 10,
        padding: 10,
        borderBottom: 1,
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
        color: '#1e40af',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontSize: 12,
        color: '#4b5563',
    },
    value: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

const TicketDocument = ({ clientInfo, flight }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>EasyFly Ticket</Text>

                <View style={styles.section}>
                    <Text style={styles.title}>Passenger Information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{`${clientInfo.name} `}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>{clientInfo.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Passport Number:</Text>
                        <Text style={styles.value}>{clientInfo.passport_number}</Text>
                    </View>

                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Flight Details</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>From:</Text>
                        <Text style={styles.value}>{flight.departure_place}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>To:</Text>
                        <Text style={styles.value}>{flight.arrival_place}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Departure Time:</Text>
                        <Text style={styles.value}>{flight.heure_depart}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Arrival Time:</Text>
                        <Text style={styles.value}>{flight.heure_arrive}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Duration:</Text>
                        <Text style={styles.value}>{`${flight.duration.hours}h ${flight.duration.minutes}m`}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Payment Details</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Amount:</Text>
                        <Text style={styles.value}>{`${flight.price} $`}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Booking Reference:</Text>
                        <Text style={styles.value}>{`EF-${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 1000)}`}</Text>
                    </View>
                </View>
            </Page>
        </Document>

    );
}

export default TicketDocument
