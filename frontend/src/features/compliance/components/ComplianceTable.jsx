<tbody>

    {

        filteredItems.map(item => (

            <ComplianceRow

                key={item.id}

                item={item}

                onDelete={deleteItem}

            />

        ))

    }

</tbody>