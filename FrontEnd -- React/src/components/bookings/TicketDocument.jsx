import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
    thankYou: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 16,
        color: '#059669',
        fontWeight: 'bold',
    },
});

// Helper to calculate duration from two datetime strings
function getDuration(departure, arrival) {
    if (!departure || !arrival) return { hours: '--', minutes: '--' };
    const dep = new Date(departure.replace(' ', 'T'));
    const arr = new Date(arrival.replace(' ', 'T'));
    const diffMs = arr - dep;
    if (isNaN(diffMs) || diffMs < 0) return { hours: '--', minutes: '--' };
    const totalMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
}

const TicketDocument = ({ clientInfo, flight }) => {
    // Calculate duration using departure_time and arrival_time
    const duration = getDuration(flight.departure_time, flight.arrival_time);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>AeroLink Ticket</Text>

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
                        <Text style={styles.value}>{flight.departure_airport.city}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>To:</Text>
                        <Text style={styles.value}>{flight.arrival_airport.city}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Departure Time:</Text>
                        <Text style={styles.value}>{flight.departure_time}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Arrival Time:</Text>
                        <Text style={styles.value}>{flight.arrival_time}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Duration:</Text>
                        <Text style={styles.value}>{`${duration.hours}h ${duration.minutes}m`}</Text>
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

                {/* Thank you message at the bottom */}
                <Text style={styles.thankYou}>
                    Thank you for booking with AeroLink! We wish you a pleasant flight.
                </Text>
            </Page>
        </Document>
    );
}

export default TicketDocument;


